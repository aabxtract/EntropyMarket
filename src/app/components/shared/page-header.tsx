type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        {title}
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
        {subtitle}
      </p>
    </div>
  );
}
