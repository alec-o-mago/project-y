import { Meta, StoryObj } from '@storybook/react'
import Button from '../components/button'

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;


export const Primary: Story = {
  args: {
    label: 'Primary',
  }
}

export const Secondary: Story = {
  args: {
    label: "Secondary",
    textColor: 'white',
    bgColor: 'black',
    borderColor: 'black',
  }
}

export const Outline: Story = {
  args: {
    label: "Outline",
    textColor: 'black',
    bgColor: 'white',
    borderColor: 'black',
  }
}

export const Big: Story = {
  args: {
    label: 'Big Button',
    textColor: 'white',
    bgColor: '#2844ff',
    borderColor: '#2844ff',
    scale: 1.3
  }
}