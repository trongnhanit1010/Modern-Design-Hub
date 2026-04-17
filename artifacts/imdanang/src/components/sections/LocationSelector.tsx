import { MapPin, Sparkles } from "lucide-react";

export default function LocationSelector() {
  return (
    <section className="bg-white border-b border-border" data-testid="section-location-selector">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 shrink-0">
            <MapPin size={17} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">Sân bay Quốc tế Đà Nẵng</p>
            <p className="text-xs text-muted-foreground leading-tight mt-0.5">Thông tin du lịch trực tuyến tại điểm đến</p>
          </div>
        </div>

        <button
          className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          data-testid="button-ai-assistant"
        >
          <Sparkles size={14} />
          AI Trợ lý
        </button>
      </div>
    </section>
  );
}
