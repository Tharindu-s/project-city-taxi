import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CheckoutFormComponent() {
  return (
    <Card className="w-full max-w-2xl mx-auto my-12 p-6 shadow-none rounded-none">
      <CardHeader>
        <CardTitle>
          <h2>Checkout</h2>
        </CardTitle>
        <CardDescription>
          Complete your payment by providing your details below.
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  className="py-4 shadow-none"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="py-4 shadow-none"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Details</h3>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                className="py-4 shadow-none"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  className="py-4 shadow-none"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  className="py-4 shadow-none"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <button type="submit" className="theme-btn">
            Confirm payment <i className="fa-solid fa-arrow-right-long" />
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}
