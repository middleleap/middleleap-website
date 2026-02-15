interface InlineCTAProps {
  label: string;
  text: string;
  href: string;
  buttonText: string;
}

export default function InlineCTA({ label, text, href, buttonText }: InlineCTAProps) {
  return (
    <div className="inline-cta rv">
      <div className="inline-cta-inner">
        <div className="inline-cta-label">{label}</div>
        <div className="inline-cta-text">{text}</div>
        <a href={href} className="inline-cta-btn">
          {buttonText} &rarr;
        </a>
      </div>
    </div>
  );
}
