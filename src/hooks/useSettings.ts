import { useState, useEffect } from "react";
import { fetchSettings, type ApiSettings } from "@/lib/api";

let cachedSettings: ApiSettings | null = null;
let fetchPromise: Promise<ApiSettings> | null = null;

const defaultSettings: ApiSettings = {
  siteName: "Sarkari Career Hub",
  siteDescription: "Your trusted source for government job notifications, admit cards, results, and more.",
  contactEmail: "admin@sarkaricareerhub.com",
  telegramLink: "",
  whatsappLink: "",
  seoTitle: "Sarkari Career Hub - Latest Government Jobs 2026",
  seoDescription: "Get latest updates on Sarkari Naukri, Government Jobs, Admit Cards, Results, and Answer Keys.",
  emailSubscriptionLink: ""
};

export function useSettings() {
  const [settings, setSettings] = useState<ApiSettings>(cachedSettings || defaultSettings);

  useEffect(() => {
    if (cachedSettings) {
      setSettings(cachedSettings);
      return;
    }

    const loadSettings = async () => {
      try {
        if (!fetchPromise) {
          fetchPromise = fetchSettings();
        }
        const data = await fetchPromise;
        cachedSettings = data;
        setSettings(data);
      } catch (err) {
        console.warn("Failed to load settings:", err);
      }
    };

    loadSettings();
  }, []);

  return settings;
}
