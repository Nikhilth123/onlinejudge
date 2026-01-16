import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function EditProblem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [testcaseMode, setTestcaseMode] = useState("upload");

  const [form, setform] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    tags: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    sampleInput: "",
    sampleOutput: "",
    testCases: [],
  });

  /* ================= FETCH DATA ================= */

  async function fetchdata() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/problems/${id}`
      );
      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.msg || "Failed to fetch problem",
          variant: "error",
        });
      } else {
        setform({
          ...data,
          tags: data.tags.join(","),
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch problem",
        variant: "error",
      });
    }
  }

  useEffect(() => {
    fetchdata();
  }, [id]);

  /* ================= HANDLERS ================= */

  const handlechange = (e) => {
    const { name, value } = e.target;
    setform((prev) => ({ ...prev, [name]: value }));
  };

  const handlefilechange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      setform((prev) => ({ ...prev, testCases: parsed }));
    } catch {
      toast({
        title: "Invalid File",
        description: "Invalid JSON file",
        variant: "error",
      });
    }
  };

  const downloadfile = () => {
    const blob = new Blob(
      [JSON.stringify(form.testCases, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "testcases.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/problems/edit/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.msg || "Failed to update problem",
          variant: "error",
        });
      } else {
        toast({
          title: "Success",
          description: "Problem edited successfully",
          variant: "success",
        });
        navigate("/problems");
      }
    } catch {
      toast({
        title: "Server Error",
        description: "Try again later",
        variant: "error",
      });
    }
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Edit Problem
        </h1>
      </div>

      <Card className="transition-all hover:shadow-xl">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handlechange}
            />
          </div>

          <div className="space-y-2">
            <Label>Difficulty</Label>
            <Select
              value={form.difficulty}
              onValueChange={(value) =>
                setform((prev) => ({ ...prev, difficulty: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* PROBLEM CONTENT */}
      <Card className="transition-all hover:shadow-xl">
        <CardHeader>
          <CardTitle>Problem Content</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <Tabs defaultValue="description">
            <ScrollArea>
              <TabsList className="w-max gap-1">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="input">Input</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="constraints">Constraints</TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <TabsContent value="description" className="pt-4">
              <Textarea
                name="description"
                value={form.description}
                onChange={handlechange}
              />
            </TabsContent>

            <TabsContent value="input" className="pt-4">
              <Textarea
                name="inputFormat"
                value={form.inputFormat}
                onChange={handlechange}
              />
            </TabsContent>

            <TabsContent value="output" className="pt-4">
              <Textarea
                name="outputFormat"
                value={form.outputFormat}
                onChange={handlechange}
              />
            </TabsContent>

            <TabsContent value="examples" className="pt-4 space-y-3">
              <Textarea
                name="sampleInput"
                value={form.sampleInput}
                onChange={handlechange}
              />
              <Textarea
                name="sampleOutput"
                value={form.sampleOutput}
                onChange={handlechange}
              />
            </TabsContent>

            <TabsContent value="constraints" className="pt-4">
              <Textarea
                name="constraints"
                value={form.constraints}
                onChange={handlechange}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* TEST CASES */}
      <Card className="transition-all hover:shadow-xl">
        <CardHeader>
          <CardTitle>Test Case Management</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <RadioGroup
            value={testcaseMode}
            onValueChange={setTestcaseMode}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="upload" id="upload" />
              <Label htmlFor="upload">Upload JSON</Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="manual" id="manual" />
              <Label htmlFor="manual">Manual Entry</Label>
            </div>
          </RadioGroup>

          {testcaseMode === "upload" && (
            <Input
              type="file"
              accept=".json"
              onChange={handlefilechange}
            />
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
        <Button variant="outline" onClick={downloadfile}>
          Download Old TestCases
        </Button>

        <Button onClick={handlesubmit}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default EditProblem;
