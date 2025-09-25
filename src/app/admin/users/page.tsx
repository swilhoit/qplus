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
import Link from "next/link"
import { ArrowLeft, Search, UserPlus, Mail, Ban, Gift } from "lucide-react"

// Mock user data - replace with Firestore queries
const mockUsers = [
  {
    id: "1",
    email: "alice@example.com",
    name: "Alice Johnson",
    subscriptionStatus: "active",
    subscriptionType: "monthly",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-20",
    purchasedContent: 5,
    freeAccess: false,
  },
  {
    id: "2",
    email: "bob@example.com",
    name: "Bob Smith",
    subscriptionStatus: "active",
    subscriptionType: "annual",
    createdAt: "2023-12-15",
    lastLogin: "2024-01-19",
    purchasedContent: 0,
    freeAccess: false,
  },
  {
    id: "3",
    email: "charlie@example.com",
    name: "Charlie Brown",
    subscriptionStatus: "cancelled",
    subscriptionType: "none",
    createdAt: "2023-11-20",
    lastLogin: "2024-01-10",
    purchasedContent: 3,
    freeAccess: false,
  },
  {
    id: "4",
    email: "diana@example.com",
    name: "Diana Prince",
    subscriptionStatus: "active",
    subscriptionType: "monthly",
    createdAt: "2024-01-15",
    lastLogin: "2024-01-20",
    purchasedContent: 0,
    freeAccess: true,
  },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || user.subscriptionStatus === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleGrantFreeAccess = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, freeAccess: true } : user
    ))
    // TODO: Update Firestore
  }

  const handleRevokeFreeAccess = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, freeAccess: false } : user
    ))
    // TODO: Update Firestore
  }

  const handleRevokeAccount = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, subscriptionStatus: "cancelled" } : user
    ))
    // TODO: Update Firestore and cancel Stripe subscription
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
                <h1 className="text-2xl font-display font-bold">User Management</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredUsers.length} users found
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="search">Search users</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="filter">Subscription Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger id="filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="past_due">Past Due</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage user subscriptions and access permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Purchases</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        {user.freeAccess && (
                          <span className="inline-flex items-center gap-1 text-xs bg-secondary/20 text-secondary px-2 py-1 rounded mt-1">
                            <Gift className="h-3 w-3" />
                            Free Access
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex text-xs px-2 py-1 rounded w-fit ${
                          user.subscriptionStatus === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.subscriptionStatus}
                        </span>
                        {user.subscriptionType !== 'none' && (
                          <span className="text-xs text-muted-foreground">
                            {user.subscriptionType}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {user.purchasedContent}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {/* TODO: Send email */}}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        {user.freeAccess ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevokeFreeAccess(user.id)}
                            title="Revoke free access"
                          >
                            <Ban className="h-4 w-4 text-red-600" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleGrantFreeAccess(user.id)}
                            title="Grant free access"
                          >
                            <Gift className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                        {user.subscriptionStatus === 'active' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevokeAccount(user.id)}
                            title="Cancel subscription"
                          >
                            <Ban className="h-4 w-4 text-orange-600" />
                          </Button>
                        )}
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