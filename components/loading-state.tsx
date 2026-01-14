export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-8 w-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
        </div>
        <p className="text-muted-foreground">Searching for nearby services...</p>
      </div>
    </div>
  )
}
