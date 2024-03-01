import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import VivoLogo from "@/assets/Vivo_mobile_logo.png";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VWorkLogin from "./VWorkLogin";
import RetailerLogin from "./RetailerLogin";
import { useAuth } from "@/providers/auth-provider";
import { Dialog, DialogTrigger } from "./ui/dialog";
import UploadDataDialog from "./UploadDataDialog";
import { useState } from "react";

export function SignIn() {
  const { user, login } = useAuth();

  const [openDialog, setOpenDialog] = useState(false);

  const handleUpload = () => {
    setOpenDialog(false);
  };

  const handleLoginUser = (data: typeof user) => {
    login(data);
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-20 w-screen h-screen">
      <img src={VivoLogo} className="w-60" />
      <Tabs defaultValue="vWorkId" className="w-3/4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vWorkId">SalesPerson</TabsTrigger>
          <TabsTrigger value="retailer">Retailer</TabsTrigger>
        </TabsList>
        <TabsContent value="vWorkId">
          <Card>
            <CardHeader className="flex flex-col items-center">
              <CardTitle>Salesperson's Login</CardTitle>
              <CardDescription>Login with V-Work Id.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <VWorkLogin onLoginUser={handleLoginUser} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="retailer" className="flex flex-col gap-4">
          <Card>
            <CardHeader className="flex flex-col items-center">
              <CardTitle>Retailer's Login</CardTitle>
              <CardDescription>Login with Retailer's Id.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <RetailerLogin onLoginUser={handleLoginUser} />
            </CardContent>
          </Card>
          <div className="flex justify-center">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <a className="underline text-indigo-600 dark:text-blue-300">
                  Bulk Upload Retailer's Data
                </a>
              </DialogTrigger>
              <UploadDataDialog onUpload={handleUpload} />
            </Dialog>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SignIn;
