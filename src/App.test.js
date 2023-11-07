import { render, screen } from '@testing-library/react';
import Tasks from '../components/Tasks';

test('renders learn react link', () => {
  render(<Tasks />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
