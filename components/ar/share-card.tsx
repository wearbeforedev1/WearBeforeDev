"use client";

import * as React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, Mail, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareCard({ link }: { link: string }) {
  const [copied, setCopied] = React.useState(false);

  function copy() {
    navigator.clipboard?.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
      <div className="mx-auto rounded-2xl border bg-white p-3">
        <QRCodeSVG value={link} size={132} bgColor="#ffffff" fgColor="#0a0a0a" />
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground mb-1.5 text-xs font-medium">Shareable preview link</p>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={link}
              className="bg-muted/40 h-10 w-full truncate rounded-lg border px-3 text-sm outline-none"
            />
            <Button size="sm" variant="outline" onClick={copy}>
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline">
            <MessageCircle className="size-4" /> WhatsApp
          </Button>
          <Button size="sm" variant="outline">
            <Mail className="size-4" /> Email
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="size-4" /> More
          </Button>
        </div>
      </div>
    </div>
  );
}
