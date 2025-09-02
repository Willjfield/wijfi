---
title: How I made my New Portfolio
---

# Making An Animated 3D Background For My Portfolio With MapLibre GL JS

## Earlier this month I moved to Glasgow, Scotland with my wife, child, dog, and two cats. 
![Me and Buster in Glasgow](./assets/MeAndBGlasgow.jpeg)

After 7 years at the CUNY Graduate Center working with Steve Romalewski on civic maps, I'm stepping back out into job market in Scotland that's very different than the one in the US in 2017. To prepare for the new job search, I updated my portfolio website and, taking advantage of my new found underemployment, started this blog to document and share my professional and personal projects. To that end, I wanted to write about the main additions I made - the 3D visualization for the background of the portfolio and the vitepress powered blog.
## The Idea

A good portfolio site, like a resume, needs to stand out from the others while not being gimmicky or distracting from the content. After overhauling my portfolio to a Vite/VueJS stack I wanted to add something interesting to the clean, minimalist design that would make it stand out without distracting from the content. I settled on the concept of using some kind of map as a background. I liked sites I'd seen that use a parallax effect for the background but wanted to take it a step further with a fully 3D terrain fly-through.

## The Data

## Setting Up The Scene

## Autoanimate

## Animate With Scrolling

::: code-group
```js [config.js]
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "My Awesome Blog",
    description: "Talking about the future !",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
        ],
        search: {
            provider: 'local'
        }
    }
})
```
:::