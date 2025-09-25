"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import Link from "next/link"
import { ArrowLeft, Plus, Copy, Trash2, Tag, Calendar, Users, ToggleLeft, ToggleRight } from "lucide-react"

// Mock promo data - replace with Firestore queries
const mockPromos = [
  {
    id: "1",
    code: "WELCOME2024",
    description: "New user welcome discount",
    discountType: "percentage",
    discountValue: 20,
    validFrom: "2024-01-01",
    validUntil: "2024-12-31",
    usageLimit: 100,
    usageCount: 45,
    isActive: true,
  },
  {
    id: "2",
    code: "COMMUNITY50",
    description: "Community partner discount",
    discountType: "percentage",
    discountValue: 50,
    validFrom: "2024-01-01",
    validUntil: null,
    usageLimit: null,
    usageCount: 12,
    isActive: true,
  },
  {
    id: "3",
    code: "SAVE10",
    description: "General discount code",
    discountType: "fixed",
    discountValue: 10,
    validFrom: "2024-01-01",
    validUntil: "2024-03-31",
    usageLimit: 50,
    usageCount: 50,
    isActive: false,
  },
]

export default function PromoCodesPage() {
  const [promos, setPromos] = useState(mockPromos)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newPromo, setNewPromo] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: 0,
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: "",
    usageLimit: "",
  })

  const handleCreatePromo = () => {
    const promo = {
      id: Date.now().toString(),
      ...newPromo,
      usageLimit: newPromo.usageLimit ? parseInt(newPromo.usageLimit) : null,
      validUntil: newPromo.validUntil || null,
      usageCount: 0,
      isActive: true,
    }
    setPromos([...promos, promo])
    setIsCreateDialogOpen(false)
    // TODO: Save to Firestore
    resetNewPromo()
  }

  const resetNewPromo = () => {
    setNewPromo({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: 0,
      validFrom: new Date().toISOString().split('T')[0],
      validUntil: "",
      usageLimit: "",
    })
  }

  const togglePromoStatus = (promoId: string) => {
    setPromos(promos.map(promo =>
      promo.id === promoId ? { ...promo, isActive: !promo.isActive } : promo
    ))
    // TODO: Update Firestore
  }

  const deletePromo = (promoId: string) => {
    setPromos(promos.filter(promo => promo.id !== promoId))
    // TODO: Delete from Firestore
  }

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code)
    // TODO: Show toast notification
  }

  const formatDiscount = (type: string, value: number) => {
    return type === "percentage" ? `${value}%` : `$${value}`
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
                <h1 className="text-2xl font-display font-bold">Promo Code Management</h1>
                <p className="text-sm text-muted-foreground">
                  {promos.filter(p => p.isActive).length} active codes
                </p>
              </div>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-primary text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Promo Code
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Promo Code</DialogTitle>
                  <DialogDescription>
                    Create a discount code for campaigns or special offers
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="code">Promo Code</Label>
                    <Input
                      id="code"
                      placeholder="SUMMER2024"
                      value={newPromo.code}
                      onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Summer campaign discount"
                      value={newPromo.description}
                      onChange={(e) => setNewPromo({ ...newPromo, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">Discount Type</Label>
                      <Select
                        value={newPromo.discountType}
                        onValueChange={(value) => setNewPromo({ ...newPromo, discountType: value })}
                      >
                        <SelectTrigger id="type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="value">Value</Label>
                      <Input
                        id="value"
                        type="number"
                        placeholder={newPromo.discountType === "percentage" ? "20" : "10"}
                        value={newPromo.discountValue}
                        onChange={(e) => setNewPromo({ ...newPromo, discountValue: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="validFrom">Valid From</Label>
                      <Input
                        id="validFrom"
                        type="date"
                        value={newPromo.validFrom}
                        onChange={(e) => setNewPromo({ ...newPromo, validFrom: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="validUntil">Valid Until (optional)</Label>
                      <Input
                        id="validUntil"
                        type="date"
                        value={newPromo.validUntil}
                        onChange={(e) => setNewPromo({ ...newPromo, validUntil: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="usageLimit">Usage Limit (optional)</Label>
                    <Input
                      id="usageLimit"
                      type="number"
                      placeholder="100"
                      value={newPromo.usageLimit}
                      onChange={(e) => setNewPromo({ ...newPromo, usageLimit: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePromo} className="gradient-primary text-white">
                    Create Code
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Codes</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{promos.filter(p => p.isActive).length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Uses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {promos.reduce((sum, p) => sum + p.usageCount, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {promos.filter(p => {
                  if (!p.validUntil) return false
                  const daysUntilExpiry = Math.ceil((new Date(p.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  return daysUntilExpiry <= 30 && daysUntilExpiry > 0
                }).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Exhausted</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {promos.filter(p => p.usageLimit && p.usageCount >= p.usageLimit).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Promo Codes Table */}
        <Card>
          <CardHeader>
            <CardTitle>Promo Codes</CardTitle>
            <CardDescription>
              Manage discount codes and track their usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Valid Period</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promos.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-semibold">{promo.code}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyPromoCode(promo.code)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {promo.description}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {formatDiscount(promo.discountType, promo.discountValue)}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="space-y-1">
                        <div>{new Date(promo.validFrom).toLocaleDateString()}</div>
                        {promo.validUntil && (
                          <div className="text-muted-foreground">
                            to {new Date(promo.validUntil).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{promo.usageCount} uses</div>
                        {promo.usageLimit && (
                          <div className="text-xs text-muted-foreground">
                            of {promo.usageLimit}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex text-xs px-2 py-1 rounded ${
                        promo.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {promo.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePromoStatus(promo.id)}
                        >
                          {promo.isActive ? (
                            <ToggleRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ToggleLeft className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deletePromo(promo.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}