import { ReactNode } from "react";
import AdminGuard from "@/components/admin/AdminGuard";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return <AdminGuard>{children}</AdminGuard>;
}
