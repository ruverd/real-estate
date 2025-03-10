import { render, screen } from '@testing-library/react';

import { Footer } from './footer';
import { MAP_TEXTS } from './footer.constants';

const renderFooter = () => {
  return render(<Footer />)
}

describe('Footer Component', () => {
  it('should renders correctly', () => {
    const { container } = renderFooter();
    
    const footerElement = container.querySelector('footer');
    expect(footerElement).toBeInTheDocument();
    
    expect(screen.getByText(MAP_TEXTS.developedBy)).toBeInTheDocument();
  });
  
  it('should has the correct styling classes', () => {
    const { container } = renderFooter();

    const footerElement = container.querySelector('footer');
    
    expect(footerElement).toHaveClass('bg-background');
    expect(footerElement).toHaveClass('text-foreground');
  });
  
  it('should match snapshot', () => {
    const { container } = renderFooter();

    expect(container.firstChild).toMatchSnapshot();
  });
});
