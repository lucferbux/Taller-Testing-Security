import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';



const meta: Meta = {
  title: 'ThreePoints/Loader',
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewMode: 'info'
  },
  decorators: [
    (Loader) => (
      <div style={{ margin: '10em' }}>
        <Loader />
      </div>
    ),
  ],
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    message: 'Loading...'
  }
};
