"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, Copy, RotateCcw, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RegexValidator() {
  const [pattern, setPattern] = useState("")
  const [testText, setTestText] = useState("")
  const [flags, setFlags] = useState({
    global: true,
    caseInsensitive: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false,
  })
  const [isPatternValid, setIsPatternValid] = useState(true)
  const [isTextValid, setIsTextValid] = useState(null)
  const [error, setError] = useState<string | null>(null)

  const flagString = useMemo(() => {
    let flagStr = ""
    if (flags.global) flagStr += "g"
    if (flags.caseInsensitive) flagStr += "i"
    if (flags.multiline) flagStr += "m"
    if (flags.dotAll) flagStr += "s"
    if (flags.unicode) flagStr += "u"
    if (flags.sticky) flagStr += "y"
    return flagStr
  }, [flags])

  const explainPattern = (pattern: string, flags: any): string => {
    if (!pattern) return "Enter a regex pattern to see its explanation"

    try {
      const explanation = "The text must "
      const parts = []

      // Check for anchors
      const startsWithStart = pattern.startsWith("^")
      const endsWithEnd = pattern.endsWith("$")
      const cleanPattern = pattern.replace(/^\^/, "").replace(/\$$/, "")

      if (startsWithStart && endsWithEnd) {
        parts.push("match the entire string exactly")
      } else if (startsWithStart) {
        parts.push("start with the pattern")
      } else if (endsWithEnd) {
        parts.push("end with the pattern")
      } else {
        parts.push("contain the pattern")
      }

      // Analyze length constraints
      const lengthMatch = cleanPattern.match(/\{(\d+)(?:,(\d+))?\}/)
      if (lengthMatch) {
        const min = lengthMatch[1]
        const max = lengthMatch[2]
        if (max) {
          parts.push(`be between ${min} and ${max} characters long`)
        } else {
          parts.push(`be exactly ${min} characters long`)
        }
      }

      // Check for word boundaries
      if (cleanPattern.includes("\\b")) {
        parts.push("match complete words only")
      }

      // Analyze character classes and sets
      const characterRules = []

      if (cleanPattern.includes("\\d")) {
        characterRules.push("digits (0-9)")
      }
      if (cleanPattern.includes("\\w")) {
        characterRules.push("letters, numbers, and underscores")
      }
      if (cleanPattern.includes("\\s")) {
        characterRules.push("whitespace characters")
      }

      // Custom character sets
      const charSetMatches = cleanPattern.match(/\[([^\]]+)\]/g)
      if (charSetMatches) {
        charSetMatches.forEach((match) => {
          const content = match.slice(1, -1)
          if (content.includes("a-z")) characterRules.push("lowercase letters")
          if (content.includes("A-Z")) characterRules.push("uppercase letters")
          if (content.includes("0-9")) characterRules.push("numbers")
          if (content.includes(" ")) characterRules.push("spaces")
          if (content.includes("-")) characterRules.push("hyphens")
          if (content.includes("'")) characterRules.push("apostrophes")
          if (content.includes("&")) characterRules.push("ampersands")
          if (content.includes(",")) characterRules.push("commas")
          if (content.includes("/")) characterRules.push("forward slashes")
          if (content.includes(".")) characterRules.push("periods")
          if (content.includes("@")) characterRules.push("at symbols")
        })
      }

      // Check for specific patterns
      if (cleanPattern.includes("@") && cleanPattern.includes("\\.")) {
        parts.push("be a valid email address format")
      } else if (cleanPattern.match(/\d{3}.*\d{3}.*\d{4}/)) {
        parts.push("be a phone number format (XXX-XXX-XXXX)")
      } else if (cleanPattern.includes("https?")) {
        parts.push("be a valid URL starting with http or https")
      } else if (cleanPattern.includes("#") && cleanPattern.includes("[A-Fa-f0-9]")) {
        parts.push("be a valid hex color code")
      }

      // Add character rules
      if (characterRules.length > 0) {
        if (characterRules.length === 1) {
          parts.push(`contain only ${characterRules[0]}`)
        } else if (characterRules.length === 2) {
          parts.push(`contain only ${characterRules[0]} and ${characterRules[1]}`)
        } else {
          const lastRule = characterRules.pop()
          parts.push(`contain only ${characterRules.join(", ")}, and ${lastRule}`)
        }
      }

      // Check quantifiers for length hints
      if (cleanPattern.includes("+")) {
        parts.push("have one or more matching characters")
      } else if (cleanPattern.includes("*")) {
        parts.push("have zero or more matching characters")
      } else if (cleanPattern.includes("?")) {
        parts.push("optionally contain the pattern")
      }

      // Add flag explanations
      const flagExplanations = []
      if (flags.caseInsensitive) {
        flagExplanations.push("case will be ignored")
      }
      if (flags.multiline) {
        flagExplanations.push("each line will be checked separately")
      }

      if (flagExplanations.length > 0) {
        parts.push(flagExplanations.join(" and "))
      }

      return explanation + parts.join(", ")
    } catch (err) {
      return "Invalid regex pattern"
    }
  }

  const patternExplanation = useMemo(() => {
    return explainPattern(pattern, flags)
  }, [pattern, flags])

  useEffect(() => {
    if (!pattern) {
      setIsTextValid(null)
      setError(null)
      setIsPatternValid(true)
      return
    }

    try {
      const regex = new RegExp(pattern, flagString)
      setError(null)
      setIsPatternValid(true)

      if (!testText) {
        setIsTextValid(null)
        return
      }

      // Test if the pattern matches the text
      const matches = regex.test(testText)
      setIsTextValid(matches)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid regular expression")
      setIsPatternValid(false)
      setIsTextValid(null)
    }
  }, [pattern, testText, flagString])

  const copyRegex = () => {
    const regexString = `/${pattern}/${flagString}`
    navigator.clipboard.writeText(regexString)
  }

  const resetForm = () => {
    setPattern("")
    setTestText("")
    setFlags({
      global: true,
      caseInsensitive: false,
      multiline: false,
      dotAll: false,
      unicode: false,
      sticky: false,
    })
  }

  const commonPatterns = [
    { name: "Email", pattern: "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b" },
    { name: "Phone", pattern: "\\b\\d{3}-\\d{3}-\\d{4}\\b" },
    {
      name: "URL",
      pattern:
        "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
    },
    { name: "Date (MM/DD/YYYY)", pattern: "\\b(0?[1-9]|1[0-2])\\/(0?[1-9]|[12][0-9]|3[01])\\/(19|20)\\d{2}\\b" },
    { name: "Hex Color", pattern: "#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})" },
    {
      name: "IPv4 Address",
      pattern: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b",
    },
  ]

  const getValidationStatus = () => {
    if (!pattern || !testText) return null
    if (!isPatternValid) return null
    return isTextValid
  }

  const validationStatus = getValidationStatus()

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Regular Expression Validator</h1>
          <p className="text-muted-foreground">Test if your text matches a regular expression pattern</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Regular Expression
                  {isPatternValid ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </CardTitle>
                <CardDescription>Enter your regular expression pattern</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pattern">Pattern</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">/</span>
                      <Input
                        id="pattern"
                        value={pattern}
                        onChange={(e) => setPattern(e.target.value)}
                        className={`pl-6 pr-12 font-mono ${!isPatternValid ? "border-red-500" : ""}`}
                        placeholder="e.g., \\d{3}-\\d{3}-\\d{4}"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        /{flagString}
                      </span>
                    </div>
                    <Button variant="outline" size="icon" onClick={copyRegex} disabled={!pattern}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={resetForm}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Pattern Explanation */}
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-sm leading-relaxed">{patternExplanation}</AlertDescription>
                </Alert>

                {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <Label>Flags</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries({
                      global: { label: "Global (g)", desc: "Find all matches" },
                      caseInsensitive: { label: "Case Insensitive (i)", desc: "Ignore case" },
                      multiline: { label: "Multiline (m)", desc: "^ and $ match line breaks" },
                      dotAll: { label: "Dot All (s)", desc: ". matches newlines" },
                      unicode: { label: "Unicode (u)", desc: "Unicode support" },
                      sticky: { label: "Sticky (y)", desc: "Match from lastIndex" },
                    }).map(([key, { label, desc }]) => (
                      <div key={key} className="flex items-start space-x-2">
                        <Checkbox
                          id={key}
                          checked={flags[key as keyof typeof flags]}
                          onCheckedChange={(checked) => setFlags((prev) => ({ ...prev, [key]: checked }))}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor={key}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {label}
                          </Label>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Patterns</CardTitle>
                <CardDescription>Click to use a common regex pattern</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {commonPatterns.map((item) => (
                    <Button
                      key={item.name}
                      variant="outline"
                      size="sm"
                      onClick={() => setPattern(item.pattern)}
                      className="justify-start h-auto p-3"
                    >
                      <div className="text-left">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground font-mono truncate">
                          {item.pattern.slice(0, 30)}...
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Text</CardTitle>
                <CardDescription>Enter text to validate against your regular expression</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="testText">Text to Test</Label>
                  <Textarea
                    id="testText"
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                    className="min-h-[120px] font-mono"
                    placeholder="Enter text to validate against your regex pattern..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Validation Result</CardTitle>
                <CardDescription>Check if your text matches the pattern</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center p-8">
                  {validationStatus === null ? (
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                        <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        {!pattern ? "Enter a regex pattern" : "Enter text to validate"}
                      </p>
                    </div>
                  ) : validationStatus ? (
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                        VALID
                      </Badge>
                      <p className="text-sm text-muted-foreground">Text matches the pattern</p>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                        <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                      </div>
                      <Badge variant="destructive">INVALID</Badge>
                      <p className="text-sm text-muted-foreground">Text does not match the pattern</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
