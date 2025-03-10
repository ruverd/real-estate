import { render, screen } from '@testing-library/react';

import { Hero } from './hero';
import { mockProps } from './hero.mock';
import type { HeroProps } from './hero.types';

const renderHero = (props: HeroProps) => {
  return render(<Hero {...props} />);
}

describe('Hero Component', () => {
  it('should renders the component with correct props', () => {
    renderHero(mockProps);
   
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    
    const heroElement = screen.getByRole('region', { name: /hero/i });

    expect(heroElement).toHaveStyle(`background-image: url(${mockProps.imageUrl})`);
  }); 

  it('should renders without crashing when props are missing', () => {
    renderHero({ title: '', description: '', imageUrl: '' });

    expect(screen.getByRole('region', { name: /hero/i })).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = renderHero(mockProps);

    expect(container.firstChild).toMatchSnapshot();
  }); 
});
