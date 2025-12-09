"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Brain,
  AlertTriangle,
  CheckCircle,
  Info,
  Upload,
  FileText,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import aiData from "@/data/ai-responses.json";

export default function AIInsightsPage() {
  const { aiSummary, riskAssessments, documentExtraction, explainability } = aiData;
  const [selectedApp, setSelectedApp] = useState<string>("APP-001");
  const [showExtraction, setShowExtraction] = useState(false);

  const currentAssessment = riskAssessments[selectedApp as keyof typeof riskAssessments];

  const riskColors = {
    low: "hsl(142 76% 36%)",
    medium: "hsl(38 92% 50%)",
    high: "hsl(0 84% 60%)",
  };

  const riskBgColors = {
    low: "bg-success/20 text-success border-success/30",
    medium: "bg-warning/20 text-warning border-warning/30",
    high: "bg-destructive/20 text-destructive border-destructive/30",
  };

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 10px rgba(14, 165, 233, 0.4)",
                "0 0 25px rgba(14, 165, 233, 0.6)",
                "0 0 10px rgba(14, 165, 233, 0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 rounded-lg bg-primary/20"
          >
            <Brain className="h-6 w-6 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold">AI Insights & Predictions</h1>
        </div>
        <p className="text-muted-foreground">
          Powered by ML models trained on{" "}
          <span className="font-mono text-primary">
            {explainability.modelInfo.trainingDataSize}
          </span>
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <Card className="p-4 border-primary/20">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <div>
              <p className="text-2xl font-bold">{aiSummary.totalAnalyzed}</p>
              <p className="text-xs text-muted-foreground">Applications Analyzed</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-primary/20">
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5 text-accent" />
            <div>
              <p className="text-2xl font-bold">{aiSummary.insightsGenerated}</p>
              <p className="text-xs text-muted-foreground">Insights Generated</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-primary/20">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-success" />
            <div>
              <p className="text-2xl font-bold">{aiSummary.predictionsAccuracy}%</p>
              <p className="text-xs text-muted-foreground">Prediction Accuracy</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-primary/20">
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-warning" />
            <div>
              <p className="text-2xl font-bold">{explainability.biasMetrics.demographicParity * 100}%</p>
              <p className="text-xs text-muted-foreground">Fairness Score</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Assessment */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Assessment
                </CardTitle>
                <select
                  value={selectedApp}
                  onChange={(e) => setSelectedApp(e.target.value)}
                  aria-label="Select application for risk assessment"
                  className="h-9 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {Object.keys(riskAssessments).map((appId) => (
                    <option key={appId} value={appId}>
                      {appId}: {riskAssessments[appId as keyof typeof riskAssessments].applicationName}
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              {currentAssessment && (
                <div className="space-y-6">
                  {/* Risk Level */}
                  <div className="flex items-center gap-6">
                    <div
                      className="w-24 h-24"
                      role="progressbar"
                      aria-valuenow={Math.round(currentAssessment.confidence * 100)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Risk assessment confidence: ${Math.round(currentAssessment.confidence * 100)}%, ${currentAssessment.riskLevel} risk level`}
                    >
                      <CircularProgressbar
                        value={currentAssessment.confidence * 100}
                        text={`${Math.round(currentAssessment.confidence * 100)}%`}
                        styles={buildStyles({
                          textSize: "24px",
                          pathColor: riskColors[currentAssessment.riskLevel as keyof typeof riskColors],
                          textColor: "hsl(210 40% 98%)",
                          trailColor: "hsl(217 33% 17%)",
                        })}
                      />
                    </div>
                    <div>
                      <Badge
                        className={cn(
                          "text-sm uppercase",
                          riskBgColors[currentAssessment.riskLevel as keyof typeof riskBgColors]
                        )}
                      >
                        {currentAssessment.riskLevel} Risk
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-2">
                        Confidence: {Math.round(currentAssessment.confidence * 100)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Assessed: {new Date(currentAssessment.assessedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Factors */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Contributing Factors (SHAP Values)</h4>
                    <div className="space-y-3">
                      {currentAssessment.factors.map((factor, index) => (
                        <motion.div
                          key={factor.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <span className="text-sm w-36 truncate">{factor.name}</span>
                          <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.abs(factor.impact) * 100}%` }}
                              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                              className={cn(
                                "h-full rounded-full",
                                factor.direction === "positive" ? "bg-warning" : "bg-success"
                              )}
                            />
                          </div>
                          <span
                            className={cn(
                              "text-sm font-mono w-14 text-right",
                              factor.direction === "positive"
                                ? "text-warning"
                                : "text-success"
                            )}
                          >
                            {factor.direction === "positive" ? "+" : "-"}
                            {factor.impact.toFixed(2)}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex gap-3">
                      <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">AI Recommendation</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {currentAssessment.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Similar Cases */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Similar Historical Cases</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentAssessment.similarCases.map((c) => (
                        <Badge
                          key={c.id}
                          variant={c.outcome === "approved" ? "success" : "warning"}
                        >
                          {c.id}: {c.outcome} ({Math.round(c.similarity * 100)}% similar)
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      Explain This Analysis
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Similar Cases
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Model Info & Document Demo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Model Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Model Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model</span>
                <span className="font-mono">{explainability.modelInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span>{explainability.modelInfo.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="text-success">{explainability.modelInfo.accuracy * 100}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">F1 Score</span>
                <span>{explainability.modelInfo.f1Score}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Features</span>
                <span>{explainability.modelInfo.features}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Audit</span>
                <span>{explainability.biasMetrics.lastAudit}</span>
              </div>
            </CardContent>
          </Card>

          {/* Document Processing Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Document Processing Demo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!showExtraction ? (
                <div className="text-center">
                  <div className="border-2 border-dashed rounded-lg p-6 mb-4">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drop a PDF to see AI extraction
                    </p>
                  </div>
                  <Button onClick={() => setShowExtraction(true)} variant="outline" className="w-full">
                    Try Sample Document
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-sm text-success">
                    <CheckCircle className="h-4 w-4" />
                    <span>
                      Processed in {documentExtraction.sampleDocument.processingTime}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {documentExtraction.sampleDocument.extractedFields.slice(0, 5).map(
                      (field, index) => (
                        <motion.div
                          key={field.field}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex justify-between text-sm p-2 rounded bg-muted/50"
                        >
                          <span className="text-muted-foreground">{field.field}</span>
                          <span className="font-mono text-xs truncate max-w-[150px]">
                            {field.value}
                          </span>
                        </motion.div>
                      )
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Overall confidence: {documentExtraction.sampleDocument.confidence * 100}%
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => setShowExtraction(false)}
                  >
                    Reset Demo
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
