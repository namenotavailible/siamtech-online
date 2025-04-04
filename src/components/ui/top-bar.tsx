
import { Bell } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Link } from "react-router-dom";

interface TopBarProps {
  className?: string;
}

export function TopBar({ className }: TopBarProps) {
  const notifications = [
    {
      id: 1,
      title: "New Blog Post: FIFINE Microphones Under 3,000 Baht",
      description: "Check out our latest guide on budget-friendly audio equipment!",
      time: "Just now",
      link: "/blog/fifine-microphones-under-3000-baht"
    },
    {
      id: 2,
      title: "Your order has shipped",
      description: "Order #1234 has been shipped and will arrive soon.",
      time: "5m ago",
      link: ""
    },
    {
      id: 3,
      title: "New product available",
      description: "Check out our latest gaming mouse!",
      time: "1h ago",
      link: ""
    },
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 h-10 z-50 px-4 ${className}`}>
      <div className="h-full max-w-7xl mx-auto flex items-center justify-end space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8"
            >
              <Bell className="h-4 w-4 text-gray-400" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4">
                {notification.link ? (
                  <Link to={notification.link} className="w-full">
                    <div className="font-medium hover:text-primary">{notification.title}</div>
                    <div className="text-sm text-gray-500">{notification.description}</div>
                    <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                  </Link>
                ) : (
                  <>
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-gray-500">{notification.description}</div>
                    <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                  </>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
