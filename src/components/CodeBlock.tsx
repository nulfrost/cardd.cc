export default function CodeBlock({ children }: { children: string }) {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  );
}
