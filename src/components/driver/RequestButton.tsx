import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import AcceptanceButton from "./AcceptanceButton";

interface Request {
  id: number;
  pickupLocation: string;
  dropLocation: string;
  status: string;
}

interface RequestButtonProps {
  requests: Request[];
}

const RequestButton = async ({ requests }: RequestButtonProps) => {
  return (
    <div className="text-center my-12">
      <Drawer>
        <DrawerTrigger className="px-4 py-3 bg-accent text-white animate-bounce">
          New requests
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-4xl">New requests</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-[600px] rounded-md border p-4">
            {requests.map((request) => (
              <Card
                className="shadow-none rounded-none mx-auto my-4 w-[90%] 2xl:w-[50%]"
                key={request.id}
              >
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{request.pickupLocation}</p>
                  <p>{request.dropLocation}</p>
                </CardContent>
                <CardFooter>
                  <AcceptanceButton id={request.id} status={request.status} />
                </CardFooter>
              </Card>
            ))}
          </ScrollArea>

          {/* <DrawerFooter>
            <Button className="bg-accent">Accept</Button>
            <Button className="bg-red-500">Decline</Button>
          <DrawerClose>
              <Button variant="default">Cancel</Button>
            </DrawerClose> 
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RequestButton;
