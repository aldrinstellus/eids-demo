"use client";

import { useState } from "react";
import {
  Shield,
  Key,
  Smartphone,
  Monitor,
  Clock,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  History,
  Fingerprint
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const activeSessions = [
  {
    id: "1",
    device: "MacBook Pro",
    browser: "Chrome 120",
    location: "Washington, DC",
    ip: "192.168.1.xxx",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "2",
    device: "iPhone 15",
    browser: "Safari Mobile",
    location: "Washington, DC",
    ip: "192.168.1.xxx",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "3",
    device: "Windows Desktop",
    browser: "Edge 119",
    location: "Bethesda, MD",
    ip: "10.0.0.xxx",
    lastActive: "Yesterday",
    current: false,
  },
];

const loginHistory = [
  { date: "Dec 9, 2025 8:42 AM", location: "Washington, DC", status: "success" },
  { date: "Dec 8, 2025 9:15 AM", location: "Washington, DC", status: "success" },
  { date: "Dec 7, 2025 7:30 AM", location: "Bethesda, MD", status: "success" },
  { date: "Dec 6, 2025 3:22 PM", location: "Unknown", status: "failed" },
  { date: "Dec 5, 2025 8:00 AM", location: "Washington, DC", status: "success" },
];

const privacySettings = [
  { id: "activity_visible", label: "Activity Visibility", description: "Allow colleagues to see your recent activity", enabled: true },
  { id: "profile_public", label: "Public Profile", description: "Make your profile visible to other users", enabled: true },
  { id: "data_analytics", label: "Usage Analytics", description: "Help improve EIDS by sharing anonymous usage data", enabled: false },
];

export default function SecurityPage() {
  const [privacy, setPrivacy] = useState(privacySettings);
  const [showPassword, setShowPassword] = useState(false);

  const togglePrivacy = (id: string) => {
    setPrivacy(prev =>
      prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p)
    );
  };

  return (
    <div className="container mx-auto py-8 px-6 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">SECURITY & PRIVACY</h1>

      <div className="space-y-6">
        {/* Security Overview */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/20">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Security Status: Strong</h2>
                <p className="text-sm text-muted-foreground">
                  Your account meets all security requirements
                </p>
              </div>
              <Badge variant="default" className="bg-success text-success-foreground">
                <CheckCircle className="h-3 w-3 mr-1" />
                Protected
              </Badge>
            </div>
            <div className="grid gap-4 mt-6 md:grid-cols-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Strong password</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>2FA enabled</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>CAC authenticated</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password & Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Key className="h-5 w-5 text-primary" />
              PASSWORD & AUTHENTICATION
            </CardTitle>
            <CardDescription>
              Manage your password and authentication methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Password</p>
                    <p className="text-xs text-muted-foreground">Last changed 45 days ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Change Password</Button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Authenticator app enabled</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-success/20 text-success">Enabled</Badge>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Fingerprint className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">CAC/PIV Card</p>
                    <p className="text-xs text-muted-foreground">Common Access Card linked</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-success/20 text-success">Verified</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Monitor className="h-5 w-5 text-primary" />
              ACTIVE SESSIONS
            </CardTitle>
            <CardDescription>
              Devices currently signed in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                      {session.device.includes("iPhone") ? (
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Monitor className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{session.device}</p>
                        {session.current && (
                          <Badge variant="outline" className="text-xs">This device</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {session.browser} • {session.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{session.lastActive}</p>
                    {!session.current && (
                      <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive mt-1">
                        Sign out
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 text-destructive hover:text-destructive">
              Sign out all other sessions
            </Button>
          </CardContent>
        </Card>

        {/* Login History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <History className="h-5 w-5 text-primary" />
              LOGIN HISTORY
            </CardTitle>
            <CardDescription>
              Recent sign-in activity on your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {loginHistory.map((login, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {login.status === "success" ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                    <div>
                      <p className="text-sm">{login.date}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {login.location}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={login.status === "success" ? "outline" : "destructive"}
                    className="text-xs"
                  >
                    {login.status === "success" ? "Successful" : "Failed"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Eye className="h-5 w-5 text-primary" />
              PRIVACY SETTINGS
            </CardTitle>
            <CardDescription>
              Control your data and privacy preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {privacy.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{setting.label}</p>
                    <p className="text-xs text-muted-foreground">{setting.description}</p>
                  </div>
                  <button
                    onClick={() => togglePrivacy(setting.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      setting.enabled ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                    role="switch"
                    aria-checked={setting.enabled}
                    aria-label={`Toggle ${setting.label}`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        setting.enabled ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
