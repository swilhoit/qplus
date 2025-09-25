"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import {
  ArrowLeft,
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Package,
  BarChart3
} from "lucide-react"

export default function AnalyticsExportPage() {
  const [exportFormat, setExportFormat] = useState("csv")
  const [dateRange, setDateRange] = useState("last-30-days")
  const [selectedData, setSelectedData] = useState({
    subscribers: true,
    revenue: true,
    content: true,
    users: false,
    promos: false,
    engagement: true,
  })
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      // In production, this would:
      // 1. Query Firestore/Stripe for data
      // 2. Format data according to selected format
      // 3. Generate file and trigger download

      const data = generateExportData()
      downloadFile(data, exportFormat)
      setIsExporting(false)
    }, 2000)
  }

  const generateExportData = () => {
    const data: any = {
      exportDate: new Date().toISOString(),
      dateRange,
    }

    if (selectedData.subscribers) {
      data.subscribers = {
        total: 156,
        monthly: 89,
        annual: 67,
        cancelled: 12,
        growth: "+15%",
      }
    }

    if (selectedData.revenue) {
      data.revenue = {
        total: 12450,
        monthly: 2340,
        subscriptions: 1890,
        oneTime: 450,
        projectedAnnual: 28080,
      }
    }

    if (selectedData.content) {
      data.content = {
        total: 47,
        byCategory: {
          "Risk & Safety": 15,
          "Organizational Tools": 18,
          "Collective Conversation": 14,
        },
        mostViewed: [
          { title: "Safety Guide", views: 234 },
          { title: "Event Template", views: 189 },
        ],
      }
    }

    if (selectedData.engagement) {
      data.engagement = {
        totalViews: 3456,
        downloads: 892,
        averageSessionTime: "5:23",
        returnRate: "67%",
      }
    }

    return data
  }

  const downloadFile = (data: any, format: string) => {
    let content = ""
    let filename = `qplus-analytics-${new Date().toISOString().split('T')[0]}`
    let mimeType = ""

    switch (format) {
      case "csv":
        content = convertToCSV(data)
        filename += ".csv"
        mimeType = "text/csv"
        break
      case "json":
        content = JSON.stringify(data, null, 2)
        filename += ".json"
        mimeType = "application/json"
        break
      case "excel":
        // In production, use a library like xlsx
        content = convertToCSV(data) // Simplified for demo
        filename += ".xlsx"
        mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        break
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const convertToCSV = (data: any) => {
    const lines = []
    lines.push("Q+ Library Analytics Export")
    lines.push(`Export Date,${data.exportDate}`)
    lines.push(`Date Range,${data.dateRange}`)
    lines.push("")

    if (data.subscribers) {
      lines.push("SUBSCRIBERS")
      lines.push("Metric,Value")
      lines.push(`Total Subscribers,${data.subscribers.total}`)
      lines.push(`Monthly Subscriptions,${data.subscribers.monthly}`)
      lines.push(`Annual Subscriptions,${data.subscribers.annual}`)
      lines.push(`Cancelled This Period,${data.subscribers.cancelled}`)
      lines.push(`Growth Rate,${data.subscribers.growth}`)
      lines.push("")
    }

    if (data.revenue) {
      lines.push("REVENUE")
      lines.push("Metric,Value")
      lines.push(`Total Revenue,$${data.revenue.total}`)
      lines.push(`Monthly Revenue,$${data.revenue.monthly}`)
      lines.push(`Subscription Revenue,$${data.revenue.subscriptions}`)
      lines.push(`One-Time Purchases,$${data.revenue.oneTime}`)
      lines.push(`Projected Annual,$${data.revenue.projectedAnnual}`)
      lines.push("")
    }

    if (data.content) {
      lines.push("CONTENT")
      lines.push("Category,Count")
      Object.entries(data.content.byCategory).forEach(([category, count]) => {
        lines.push(`${category},${count}`)
      })
      lines.push("")
      lines.push("Most Viewed Content")
      lines.push("Title,Views")
      data.content.mostViewed.forEach((item: any) => {
        lines.push(`${item.title},${item.views}`)
      })
      lines.push("")
    }

    return lines.join("\n")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-display font-bold">Export Analytics</h1>
                <p className="text-sm text-muted-foreground">
                  Download your data for analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="grid gap-6">
          {/* Export Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Export Configuration</CardTitle>
              <CardDescription>
                Choose what data to include in your export
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Range */}
              <div>
                <Label htmlFor="date-range">Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger id="date-range">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Export Format */}
              <div>
                <Label htmlFor="format">Export Format</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger id="format">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="json">JSON (.json)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Data Selection */}
              <div>
                <Label className="mb-3 block">Select Data to Export</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="subscribers"
                      checked={selectedData.subscribers}
                      onCheckedChange={(checked) =>
                        setSelectedData({ ...selectedData, subscribers: checked as boolean })
                      }
                    />
                    <label
                      htmlFor="subscribers"
                      className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                    >
                      <Users className="h-4 w-4" />
                      Subscriber Data
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="revenue"
                      checked={selectedData.revenue}
                      onCheckedChange={(checked) =>
                        setSelectedData({ ...selectedData, revenue: checked as boolean })
                      }
                    />
                    <label
                      htmlFor="revenue"
                      className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                    >
                      <DollarSign className="h-4 w-4" />
                      Revenue Analytics
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="content"
                      checked={selectedData.content}
                      onCheckedChange={(checked) =>
                        setSelectedData({ ...selectedData, content: checked as boolean })
                      }
                    />
                    <label
                      htmlFor="content"
                      className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                    >
                      <Package className="h-4 w-4" />
                      Content Performance
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="engagement"
                      checked={selectedData.engagement}
                      onCheckedChange={(checked) =>
                        setSelectedData({ ...selectedData, engagement: checked as boolean })
                      }
                    />
                    <label
                      htmlFor="engagement"
                      className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                    >
                      <TrendingUp className="h-4 w-4" />
                      User Engagement
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="users"
                      checked={selectedData.users}
                      onCheckedChange={(checked) =>
                        setSelectedData({ ...selectedData, users: checked as boolean })
                      }
                    />
                    <label
                      htmlFor="users"
                      className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                    >
                      <Users className="h-4 w-4" />
                      User Details (PII)
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="promos"
                      checked={selectedData.promos}
                      onCheckedChange={(checked) =>
                        setSelectedData({ ...selectedData, promos: checked as boolean })
                      }
                    />
                    <label
                      htmlFor="promos"
                      className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                    >
                      <BarChart3 className="h-4 w-4" />
                      Promo Code Usage
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Export Summary</CardTitle>
              <CardDescription>
                Preview of data to be exported
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Range:</span>
                  <span className="font-medium">{dateRange.replace(/-/g, ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-medium">{exportFormat.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Types:</span>
                  <span className="font-medium">
                    {Object.entries(selectedData).filter(([_, v]) => v).length} selected
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Size:</span>
                  <span className="font-medium">~245 KB</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Privacy Notice:</strong> This export may contain sensitive user data.
                  Ensure compliance with privacy regulations when handling exported data.
                </p>
              </div>

              <Button
                className="w-full mt-6 gradient-primary text-white"
                onClick={handleExport}
                disabled={isExporting || !Object.values(selectedData).some(v => v)}
              >
                {isExporting ? (
                  <>Processing Export...</>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export Analytics
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Recent Exports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Exports</CardTitle>
              <CardDescription>
                Your export history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">analytics-2024-01-20.csv</p>
                      <p className="text-xs text-muted-foreground">Last 30 days • 234 KB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">full-export-2024-01-01.xlsx</p>
                      <p className="text-xs text-muted-foreground">All time • 1.2 MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}