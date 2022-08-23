import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react"

import { Editor } from "../components";

export default {
    title: "Editor",
    component: Editor
} as ComponentMeta<typeof Editor>

const Template: ComponentStory<typeof Editor> = (args) => <Editor {...args} />

export const BasicEditor = Template.bind({})

export const ConfiguredEditor = Template.bind({})
ConfiguredEditor.args ={
    initialConfig: {
        namespace: "my-editor",
        onError: (error:Error) => console.log(error),
        readOnly: false
    }
}