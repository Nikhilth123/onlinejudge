import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

function CreateProblem() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [testcaseMode, setTestcaseMode] = useState("upload");
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
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

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const tagsArray = form.tags.split(",").map((t) => t.trim());

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("difficulty", form.difficulty);
    formData.append("tags", tagsArray.join(","));
    formData.append("sampleInput", form.sampleInput);
    formData.append("sampleOutput", form.sampleOutput);
    formData.append("inputFormat", form.inputFormat);
    formData.append("outputFormat", form.outputFormat);
    formData.append("constraints", form.constraints);

    if (testcaseMode === "upload") {
      if (!file) {
        toast({
          title: "Missing file",
          description: "Please upload a test case JSON file",
          variant: "error",
        });
        return;
      }
      formData.append("testCasesFile", file);
    } else {
      formData.append("testCases", JSON.stringify(form.testCases));
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/problems/addproblem`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.msg || "Failed to create problem",
          variant: "error",
        });
      } else {
        toast({
          title: "Success",
          description: "Problem added successfully",
          variant: "success",
        });
        navigate("/problems");
      }
    } catch (err) {
      toast({
        title: "Network Error",
        description: err.message,
        variant: "error",
      });
    }
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Create Problem
        </h1>
      </div>

      <Card className="transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-1">
            <Label>Title</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label>Difficulty</Label>
            <Select
              value={form.difficulty}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, difficulty: value }))
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

      <Card className="transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle>Problem Content</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Tabs defaultValue="description">
            <ScrollArea>
              <TabsList className="w-max">
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
                onChange={handleChange}
              />
            </TabsContent>

            <TabsContent value="input" className="pt-4">
              <Textarea
                name="inputFormat"
                onChange={handleChange}
              />
            </TabsContent>

            <TabsContent value="output" className="pt-4">
              <Textarea
                name="outputFormat"
                onChange={handleChange}
              />
            </TabsContent>

            <TabsContent value="examples" className="pt-4">
              <Textarea
                name="sampleInput"
                onChange={handleChange}
              />
              <Textarea
                name="sampleOutput"
                onChange={handleChange}
              />
            </TabsContent>

            <TabsContent value="constraints" className="pt-4">
              <Textarea
                name="constraints"
                onChange={handleChange}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle>Test Case Management</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <RadioGroup
            value={testcaseMode}
            onValueChange={setTestcaseMode}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upload" id="upload" />
              <Label htmlFor="upload">Upload JSON</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual" id="manual" />
              <Label htmlFor="manual">Manual Entry</Label>
            </div>
          </RadioGroup>

          {testcaseMode === "upload" && (
            <Input
              type="file"
              accept=".json"
              onChange={handleFileChange}
            />
          )}
          {testcaseMode === "manual" && (
  <div className="space-y-4">
    {form.testCases.map((tc, index) => (
      <Card key={index}>
        <CardContent className="space-y-3 pt-4">
          <Label>Input</Label>
          <Textarea
            value={tc.input}
            onChange={(e) => {
              const updated = [...form.testCases];
              updated[index].input = e.target.value;
              setForm((prev) => ({ ...prev, testCases: updated }));
            }}
          />

          <Label>Expected Output</Label>
          <Textarea
            value={tc.output}
            onChange={(e) => {
              const updated = [...form.testCases];
              updated[index].output = e.target.value;
              setForm((prev) => ({ ...prev, testCases: updated }));
            }}
          />

          <Button
            variant="destructive"
            onClick={() => {
              const updated = form.testCases.filter((_, i) => i !== index);
              setForm((prev) => ({ ...prev, testCases: updated }));
            }}
          >
            Remove Test Case
          </Button>
        </CardContent>
      </Card>
    ))}

    <Button
      variant="outline"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          testCases: [...prev.testCases, { input: "", output: "" }],
        }))
      }
    >
      + Add Test Case
    </Button>
  </div>
)}

        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pt-4">
        <Button onClick={handleSubmit}>
          Publish Problem
        </Button>
      </div>
    </div>
  );
}

export default CreateProblem;
