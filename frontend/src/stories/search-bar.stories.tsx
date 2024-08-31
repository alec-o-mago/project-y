import { Meta, StoryObj } from '@storybook/react'
import SearchBar from '../components/search-bar'

const meta: Meta<typeof SearchBar> = {
  title: "Search Bar",
  component: SearchBar,
};
export default meta;

type Story = StoryObj<typeof SearchBar>;


export const Primary: Story = {
  args: {
    placeholder: 'Primary Search...',
  },
  render: (args) => (
    <div style={{width:"300px"}}>
      <SearchBar {...args} />
    </div>
  ),
}
