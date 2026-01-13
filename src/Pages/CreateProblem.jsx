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

function CreateProblem() {
  const [difficulty, setDifficulty] = useState("Easy")
  const [testcaseMode, setTestcaseMode] = useState("upload")

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Create Problem
        </h1>
        <p className="text-sm text-muted-foreground">
          Problem ID: <span className="font-medium">125</span>
        </p>
      </div>

      {/* BASIC INFO */}
      <Card className="transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-1">
            <Label>Title</Label>
            <Input placeholder="Enter problem title" />
          </div>

          <div className="space-y-1">
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

      {/* DESCRIPTION */}
      <Card className="transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle>Problem Content</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Tabs defaultValue="description" className="w-full">

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
                placeholder="Write problem description here..."
                className="min-h-[220px]"
              />
            </TabsContent>

            <TabsContent value="input" className="pt-4">
              <Textarea
                placeholder="Describe input format..."
                className="min-h-[160px]"
              />
            </TabsContent>

            <TabsContent value="output" className="pt-4">
              <Textarea
                placeholder="Describe output format..."
                className="min-h-[160px]"
              />
            </TabsContent>

            <TabsContent value="examples" className="pt-4">
              <div className="space-y-3">
                <Textarea placeholder="Sample Input" />
                <Textarea placeholder="Sample Output" />
              </div>
            </TabsContent>

            <TabsContent value="constraints" className="pt-4">
              <Textarea placeholder="Constraints" />
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>

      {/* TEST CASES */}
      <Card className="transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle>Test Case Management</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <RadioGroup
            value={testcaseMode}
            onValueChange={setTestcaseMode}
            className="space-y-3"
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
            <Input type="file" accept=".json" />
          )}

          {testcaseMode === "manual" && (
            <Textarea
              placeholder="Enter test cases manually..."
              className="min-h-[140px]"
            />
          )}
        </CardContent>
      </Card>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-4">
        <Button className="px-8">
          Publish Problem
        </Button>
      </div>

    </div>
  )
}

export default CreateProblem
