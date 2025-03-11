import type { PropertyErrorProps } from "./property-error.types";

export const PropertyError = ({ errorMessage }: PropertyErrorProps) => {
  return (
    <div className="container mx-auto py-8">
      <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-md">
        {errorMessage}
      </div>
    </div>
  );
};
