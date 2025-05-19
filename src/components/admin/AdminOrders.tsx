
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical } from "lucide-react";

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    customer: "Ramesh Sharma",
    date: "2023-12-15",
    status: "delivered",
    total: 32500,
    paymentMethod: "esewa",
    items: 2,
  },
  {
    id: "ORD-002",
    customer: "Sita Thapa",
    date: "2023-12-14",
    status: "processing",
    total: 27500,
    paymentMethod: "khalti",
    items: 1,
  },
  {
    id: "ORD-003",
    customer: "Binod KC",
    date: "2023-12-12",
    status: "shipped",
    total: 15000,
    paymentMethod: "cash",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Anita Gurung",
    date: "2023-12-10",
    status: "cancelled",
    total: 45000,
    paymentMethod: "esewa",
    items: 3,
  },
  {
    id: "ORD-005",
    customer: "Prakash Malla",
    date: "2023-12-09",
    status: "delivered",
    total: 28000,
    paymentMethod: "khalti",
    items: 1,
  },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500 hover:bg-green-600";
      case "processing":
        return "bg-blue-500 hover:bg-blue-600";
      case "shipped":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "cancelled":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Table>
        <TableCaption>A list of all orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Badge className={getStatusBadgeColor(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="npr-currency">{order.total}</TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                    <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOrders;
