import { Save, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function ProgramActionBar() {
  const navigate = useNavigate();

  const handleSave = () => {
    toast({ title: "Program saved", description: "Your program has been saved successfully." });
  };

  return (
    <div className="border-t bg-card/95 backdrop-blur-sm px-6 py-3 flex items-center justify-start gap-3 mt-6">
      <Button variant="outline" className="gap-2" onClick={handleSave}>
        <Save className="h-4 w-4" />
        Save Program
      </Button>
      <Button className="gap-2" onClick={() => navigate("/designs")}>
        Continue to Designs
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
