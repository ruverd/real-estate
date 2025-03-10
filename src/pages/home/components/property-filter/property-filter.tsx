import { zodResolver } from '@hookform/resolvers/zod';
import { Bath, BedDouble, Car, SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/shared/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';

import { usePropertyFilter } from './property-filter-context';
import {
  BATHROOM_OPTIONS,
  BEDROOM_OPTIONS,
  MAP_TEXTS,
  PARKING_OPTIONS,
  PRICE_RANGE_OPTIONS
} from './property-filter.constants';
import { PropertyFilterSchema, PropertyFilterValues } from './property-filter.types';

export const PropertyFilter = () => {
  const { setFilters } = usePropertyFilter();
  
  const form = useForm<PropertyFilterValues>({
    resolver: zodResolver(PropertyFilterSchema),
    defaultValues: {
      [MAP_TEXTS.FORM.BEDROOMS.FIELD_NAME]: 'any',
      [MAP_TEXTS.FORM.BATHROOMS.FIELD_NAME]: 'any',
      [MAP_TEXTS.FORM.PARKING.FIELD_NAME]: 'any',
      [MAP_TEXTS.FORM.PRICE_MIN.FIELD_NAME]: 'any',
      [MAP_TEXTS.FORM.PRICE_MAX.FIELD_NAME]: 'any',
    }
  });

  const onSubmit = (data: PropertyFilterValues) => {
    console.log('Applied filters:', data);
    setFilters(data);
  };

  return (
    <div className="absolute z-10 bg-background -bottom-20 md:-bottom-10 left-1/2 -translate-x-1/2 shadow-lg rounded-lg p-4 w-fit md:px-12 md:py-4 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="w-full flex justify-center">
            <div className="flex flex-col md:flex-row md:flex-nowrap items-end gap-3 w-fit mx-auto">
              <div className="flex flex-row gap-3 w-full justify-between">
                <FormField
                  control={form.control}
                  name={MAP_TEXTS.FORM.BEDROOMS.FIELD_NAME as keyof PropertyFilterValues}
                  render={({ field }) => (
                    <FormItem className="space-y-0.5 flex-1 min-w-0">
                      <FormLabel htmlFor="bedrooms" className="text-sm font-medium text-foreground">
                        {MAP_TEXTS.FORM.BEDROOMS.LABEL}
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="bedrooms" className="w-full flex items-center gap-2" aria-label="Select number of bedrooms">
                            <BedDouble className="size-4 shrink-0" />
                            <SelectValue placeholder={MAP_TEXTS.FORM.BEDROOMS.PLACEHOLDER} className="truncate" />
                          </SelectTrigger>
                          <SelectContent>
                            {BEDROOM_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={MAP_TEXTS.FORM.BATHROOMS.FIELD_NAME as keyof PropertyFilterValues}
                  render={({ field }) => (
                    <FormItem className="space-y-0.5 flex-1 min-w-0">
                      <FormLabel htmlFor="bathrooms" className="text-sm font-medium text-foreground">
                        {MAP_TEXTS.FORM.BATHROOMS.LABEL}
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="bathrooms" className="w-full flex items-center gap-2" aria-label="Select number of bathrooms">
                            <Bath className="size-4 shrink-0" />
                            <SelectValue placeholder={MAP_TEXTS.FORM.BATHROOMS.PLACEHOLDER} className="truncate" />
                          </SelectTrigger>
                          <SelectContent>
                            {BATHROOM_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={MAP_TEXTS.FORM.PARKING.FIELD_NAME as keyof PropertyFilterValues}
                  render={({ field }) => (
                    <FormItem className="space-y-0.5 flex-1 min-w-0">
                      <FormLabel htmlFor="parking" className="text-sm font-medium text-foreground">
                        {MAP_TEXTS.FORM.PARKING.LABEL}
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="parking" className="w-full flex items-center gap-2" aria-label="Select number of parking spaces">
                            <Car className="size-4 shrink-0" />
                            <SelectValue placeholder={MAP_TEXTS.FORM.PARKING.PLACEHOLDER} className="truncate" />
                          </SelectTrigger>
                          <SelectContent>
                            {PARKING_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3 w-full justify-between mt-3 md:mt-0">
                <FormItem className="space-y-0.5 mb-0.5 w-64 flex-1">
                  <FormLabel htmlFor="priceRange" className="text-sm font-medium text-foreground">
                    Price Range
                  </FormLabel>
                  <div className="flex items-center gap-2 w-full">
                    <FormField
                      control={form.control}
                      name={MAP_TEXTS.FORM.PRICE_MIN.FIELD_NAME as keyof PropertyFilterValues}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger id="priceMin" className="w-full" aria-label="Select minimum price">
                                <SelectValue placeholder={MAP_TEXTS.FORM.PRICE_MIN.PLACEHOLDER} className="truncate" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any">Min</SelectItem>
                                {PRICE_RANGE_OPTIONS.slice(1).map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <span className="text-gray-500 shrink-0">-</span>
                    <FormField
                      control={form.control}
                      name={MAP_TEXTS.FORM.PRICE_MAX.FIELD_NAME as keyof PropertyFilterValues}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger id="priceMax" className="w-full" aria-label="Select maximum price">
                                <SelectValue placeholder={MAP_TEXTS.FORM.PRICE_MAX.PLACEHOLDER} className="truncate" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any">Max</SelectItem>
                                {PRICE_RANGE_OPTIONS.slice(1).map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </FormItem>

                <div className="mb-0.5 flex items-end">
                  <Button 
                    type="submit"
                    aria-label="Search"
                    size={'default'}
                    className="flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <SearchIcon className="size-4 shrink-0" />
                    <span className="truncate">{MAP_TEXTS.FORM.SUBMIT}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};