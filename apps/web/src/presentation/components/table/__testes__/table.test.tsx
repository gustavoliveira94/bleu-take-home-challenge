import { render, screen } from '@testing-library/react';
import { Table } from '../table';

describe('<Table />', () => {
  const columns = ['Name', 'Age', 'City'];
  const rows = [
    ['Alice', 30, 'New York'],
    ['Bob', 25, 'Los Angeles'],
  ];

  it('renders table headers correctly', () => {
    render(<Table columns={columns} rows={[]} />);

    // Check if all column headers are rendered
    columns.forEach((col) => {
      expect(screen.getByText(col)).toBeInTheDocument();
    });
  });

  it('renders loading spinner when loading is true', () => {
    render(<Table columns={columns} rows={[]} loading={true} />);

    // Check if loader is displayed
    const loader = screen.getByRole('cell').querySelector('svg');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('animate-spin');
  });

  it('renders no data message when rows is empty and not loading', () => {
    const noDataMessage = 'No records found';

    render(<Table columns={columns} rows={[]} loading={false} noData={noDataMessage} />);

    // Check if no data message is displayed
    expect(screen.getByText(noDataMessage)).toBeInTheDocument();
  });

  it('renders rows correctly', () => {
    render(<Table columns={columns} rows={rows} />);

    // Check if cell data is rendered
    rows.flat().forEach((cell) => {
      expect(screen.getByText(cell.toString())).toBeInTheDocument();
    });
  });

  it('renders default no data message if noData prop is not provided', () => {
    render(<Table columns={columns} rows={[]} loading={false} />);

    expect(screen.getByText('There are no data.')).toBeInTheDocument();
  });
});
