import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function EditProblem() {
  const [difficulty, setDifficulty] = useState("Easy")
  const [testcaseMode, setTestcaseMode] = useState("upload")

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Edit Problem
        </h1>
        <p className="text-sm text-muted-foreground">
          Problem ID <span className="font-medium">#125</span>
        </p>
      </div>

      {/* BASIC INFO */}
      <Card className="transition-all hover:shadow-xl">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <Label>Title</Label>
            <Input placeholder="Enter problem title" />
          </div>

          <div className="space-y-2">
            <Label>Difficulty</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
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
                className="min-h-[220px]"
                placeholder="Write problem description here..."
              />
            </TabsContent>

            <TabsContent value="input" className="pt-4">
              <Textarea
                className="min-h-[160px]"
                placeholder="Describe input format..."
              />
            </TabsContent>

            <TabsContent value="output" className="pt-4">
              <Textarea
                className="min-h-[160px]"
                placeholder="Describe output format..."
              />
            </TabsContent>

            <TabsContent value="examples" className="pt-4 space-y-3">
              <Textarea placeholder="Sample Input" />
              <Textarea placeholder="Sample Output" />
            </TabsContent>

            <TabsContent value="constraints" className="pt-4">
              <Textarea placeholder="Constraints" />
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
            <Input type="file" accept=".json" />
          )}

          {testcaseMode === "manual" && (
            <Textarea
              className="min-h-[140px]"
              placeholder="Enter test cases manually..."
            />
          )}
        </CardContent>
      </Card>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
  <Button
    variant="outline"
    className="self-end sm:self-auto"
  >
    Download Old TestCases
  </Button>

  <Button
    className="self-end sm:self-auto"
  >
    Save Changes
  </Button>
</div>


    </div>
  )
}

export default EditProblem
