import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function ConfirmationDialog({Open,title,desc}){
<Dialog>
  <DialogTrigger>{Open}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>
        {desc}
      </DialogDescription>
    </DialogHeader>
     <button className="bg-gray-300">Cancle</button>
    <button className="bg-green-400">Confirm</button>
  </DialogContent>
</Dialog>
}
export default ConfirmationDialog;