import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MOCK_PROPERTIES } from '@/shared/mocks/property.mock';
import { isPropertyNew } from '@/shared/utils/date';
import { formatPrice } from '@/shared/utils/number';

import { PropertyCard } from './property-card';
import { PROPERTY_FEATURES } from './property-card.constants';
import type { PropertyCardProps } from './property-card.types';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('@/shared/utils/number', () => ({
  formatPrice: vi.fn().mockImplementation((price) => `$${price.toLocaleString()}`),
}));

vi.mock('@/shared/utils/date', () => ({
  isPropertyNew: vi.fn(),
}));

const mockProperty = MOCK_PROPERTIES[0];

const renderPropertyCard = (props?: PropertyCardProps) => {
  const defaultProps: PropertyCardProps = {
    property: mockProperty,
    showFeatures: true,
  };

  return render(<PropertyCard {...defaultProps} {...props} />);
};

describe('PropertyCard', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render property information correctly', () => {
    renderPropertyCard();
    
    expect(screen.getByText(mockProperty.title)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.location)).toBeInTheDocument();
    expect(screen.getByText(formatPrice(mockProperty.salePrice))).toBeInTheDocument();
    
    const bedroomsSection = screen.getByText('Bedrooms').closest('div');
    const bathroomsSection = screen.getByText('Bathrooms').closest('div');
    const areaSection = screen.getByText('Total area').closest('div');
    const parkingSection = screen.getByText('Parking').closest('div');
    
    expect(within(bedroomsSection!).getByText(mockProperty.bedrooms.toString())).toBeInTheDocument();
    expect(within(bathroomsSection!).getByText(mockProperty.bathrooms.toString())).toBeInTheDocument();
    expect(within(areaSection!).getByText(mockProperty.sqft.toString())).toBeInTheDocument();
    expect(within(parkingSection!).getByText(mockProperty.parking.toString())).toBeInTheDocument();
    
    PROPERTY_FEATURES.forEach(feature => {
      expect(screen.getByText(feature.label)).toBeInTheDocument();
    });
  });

  it('should display the badge when property is new', () => {
    vi.mocked(isPropertyNew).mockReturnValue(true);
    
    renderPropertyCard();
    
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('should not display the badge when property is not new', () => {
    vi.mocked(isPropertyNew).mockReturnValue(false);
    
    renderPropertyCard();
    
    expect(screen.queryByText('New')).not.toBeInTheDocument();
  });

  it('should not render features when showFeatures is false', () => {
    renderPropertyCard({ property: mockProperty, showFeatures: false });
    
    PROPERTY_FEATURES.forEach(feature => {
      expect(screen.queryByText(feature.label)).not.toBeInTheDocument();
    });
  });

  it('should have proper accessibility attributes', () => {
    renderPropertyCard();
    
    const card = screen.getByRole('article');

    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('aria-label', 
      `${mockProperty.title} in ${mockProperty.location} for ${formatPrice(mockProperty.salePrice)}`
    );
  });

  it('should show loading state before image loads', () => {
    renderPropertyCard();
    
    const loadingPlaceholder = screen.getByTestId('loading-placeholder'); 
    const image = screen.getByAltText(mockProperty.title);

    expect(loadingPlaceholder).toBeInTheDocument();
    expect(image).toHaveClass('hidden');
  });

  it('should show error state when image fails to load', () => {
    renderPropertyCard();
    
    const image = screen.getByAltText(mockProperty.title);
    fireEvent.error(image);
    
    expect(screen.getByText('Image not available')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = renderPropertyCard();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render features when showFeatures is false', () => {
    renderPropertyCard({ property: mockProperty, showFeatures: false });

    expect(screen.queryByText('Features')).not.toBeInTheDocument();
  });
});
