"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Globe,
  Palette,
  Mail,
  Smartphone,
  Monitor,
  Check
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const notificationSettings = [
  { id: "email_updates", label: "Email Updates", description: "Receive application status updates via email", enabled: true },
  { id: "email_digest", label: "Daily Digest", description: "Receive a daily summary of all activities", enabled: false },
  { id: "push_alerts", label: "Push Notifications", description: "Browser notifications for urgent items", enabled: true },
  { id: "sms_alerts", label: "SMS Alerts", description: "Text messages for critical compliance issues", enabled: false },
];

const displaySettings = [
  { id: "compact", label: "Compact View", description: "Show more information in less space" },
  { id: "default", label: "Default View", description: "Balanced information density" },
  { id: "comfortable", label: "Comfortable View", description: "More whitespace, easier reading" },
];

const languageOptions = [
  { code: "en", label: "English (US)", flag: "🇺🇸" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "fr", label: "French", flag: "🇫🇷" },
];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(notificationSettings);
  const [displayMode, setDisplayMode] = useState("default");
  const [language, setLanguage] = useState("en");
  const [saved, setSaved] = useState(false);

  const toggleNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n)
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="container mx-auto py-8 px-6 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">ACCOUNT SETTINGS</h1>
        <Button onClick={handleSave} className="gap-2">
          {saved ? (
            <>
              <Check className="h-4 w-4" />
              Saved
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-primary" />
              PROFILE INFORMATION
            </CardTitle>
            <CardDescription>
              Manage your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  defaultValue="Dr. Sarah Chen"
                  className="w-full mt-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-label="Full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  defaultValue="sarah.chen@dha.mil"
                  className="w-full mt-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled
                  aria-label="Email address"
                />
                <p className="text-xs text-muted-foreground mt-1">Contact IT to change email</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Department</label>
                <input
                  type="text"
                  defaultValue="Medical Research"
                  className="w-full mt-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled
                  aria-label="Department"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Role</label>
                <input
                  type="text"
                  defaultValue="Principal Investigator"
                  className="w-full mt-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled
                  aria-label="Role"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5 text-primary" />
              NOTIFICATION PREFERENCES
            </CardTitle>
            <CardDescription>
              Choose how you want to receive updates and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {setting.id.includes("email") ? (
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    ) : setting.id.includes("push") ? (
                      <Monitor className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{setting.label}</p>
                      <p className="text-xs text-muted-foreground">{setting.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotification(setting.id)}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors",
                      setting.enabled ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    role="switch"
                    aria-checked={setting.enabled}
                    aria-label={`Toggle ${setting.label}`}
                  >
                    <span
                      className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                        setting.enabled ? "translate-x-7" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Palette className="h-5 w-5 text-primary" />
              DISPLAY PREFERENCES
            </CardTitle>
            <CardDescription>
              Customize how information is displayed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {displaySettings.map((setting) => (
                <button
                  key={setting.id}
                  onClick={() => {
                    setDisplayMode(setting.id);
                    setSaved(false);
                  }}
                  className={cn(
                    "p-4 rounded-lg border-2 text-left transition-colors",
                    displayMode === setting.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <p className="text-sm font-medium">{setting.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{setting.description}</p>
                  {displayMode === setting.id && (
                    <Badge className="mt-2" variant="default">Active</Badge>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-primary" />
              LANGUAGE & REGION
            </CardTitle>
            <CardDescription>
              Set your preferred language and regional settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setSaved(false);
                  }}
                  className={cn(
                    "p-4 rounded-lg border-2 text-left transition-colors flex items-center gap-3",
                    language === lang.code
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <p className="text-sm font-medium">{lang.label}</p>
                    {language === lang.code && (
                      <Badge className="mt-1" variant="default">Selected</Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
