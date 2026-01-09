import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area"
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
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Create Problem</h1>
        <p className="text-sm text-muted-foreground">
          Problem ID: <span className="font-medium">125</span>
        </p>
      </div>

      {/* BASIC INFO */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Label>Title</Label>
            <Input placeholder="Enter problem title" />
          </div>

          <div>
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
      <Card>
        <CardHeader>
          <CardTitle>Problem Content</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="description" className="w-full">
            <ScrollArea>
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="input">Input Format</TabsTrigger>
              <TabsTrigger value="output">Output Format</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
               <TabsTrigger value="constraints">Constraints</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal"></ScrollBar>
            </ScrollArea>

            <TabsContent value="description">
              <Textarea
                placeholder="Write problem description here..."
                className="min-h-[200px]"
              />
            </TabsContent>

            <TabsContent value="input">
              <Textarea
                placeholder="Describe input format..."
                className="min-h-[150px]"
              />
            </TabsContent>

            <TabsContent value="output">
              <Textarea
                placeholder="Describe output format..."
                className="min-h-[150px]"
              />
            </TabsContent>

            <TabsContent value="examples">
              <div className="space-y-4">
                <Textarea placeholder="Sample Input" />
                <Textarea placeholder="Sample Output" />
              </div>
            </TabsContent>
            <TabsContent value="constraints">
              <div className="space-y-4">
                <Textarea placeholder="Constraints" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* TEST CASES */}
      <Card>
        <CardHeader>
          <CardTitle>Test Case Management</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <RadioGroup
            value={testcaseMode}
            onValueChange={setTestcaseMode}
            className="space-y-2"
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
            <Textarea placeholder="Enter test cases manually..." />
          )}
        </CardContent>
      </Card>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
       
        <Button>Publish Problem</Button>
      </div>

    </div>
  )
}

export default CreateProblem
