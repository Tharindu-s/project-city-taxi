import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    // Parse the incoming JSON data from the request body
    const { fileName, fileContent } = await req.json();

    // If the base64 string contains metadata (like data:image/png;base64,...), strip it
    const base64Data = fileContent.replace(/^data:([A-Za-z-+/]+);base64,/, "");

    // Specify the directory to save the uploaded file
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, fileName);

    // Ensure the uploads directory exists
    await mkdir(uploadDir, { recursive: true });

    // Convert base64 content to Buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Write the file to the disk
    await writeFile(filePath, buffer);

    // Return the response with the file path
    return NextResponse.json({
      message: "File uploaded successfully",
      filePath,
    });
  } catch (error) {
    // Handle errors and return an error response
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error uploading file", error: errorMessage },
      { status: 500 }
    );
  }
}
