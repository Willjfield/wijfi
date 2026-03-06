---
title: Why I Made an AI Agent for Maputnik
---

# Maputnik Style Editor

Not to be left in the dust on AI but cautious not to burn tokens (and Co2) just for novelty's sake, it took me some time to come around to an AI project I felt was worth pursuing. Of course as a designer and programmer who works with web mapping and likes building software tools, it shouldn't have taken so long to look at Maputnik which was staring right at me the whole time. Maybe it would be possible to design map styles through prompts. But it took my wife pointing out a truly worthwhile use case to decide that building an AI agent for Maputnik was a valuable goal to pursue: Probably erhaps this could help make maps more accessible.

Maputnik is a free, open-source visual editor for MapLibre GL styles, aimed at developers and map designers. It’s the style editor used at maplibre.org/maputnik, built with React and TypeScript on top of MapLibre GL JS, and supports the full MapLibre style spec (layers, sources, paint, layout, etc.) through a UI.

# Why does it need a chat interface?

Accessibility is too often seen a "nice to have" by clients, developers, and designers. While it's very rare (in my experience) to run into head winds that oppose implementing accessibility features, it's also rare for a project to get the tail winds needed to actually move accessibility forward or prioritize it.

When approaching accessibility in any design project I've worked on, the first challenge is to find accessibility guidelines to follow which are reliable and relevant. General web accessibility guidelines are not _too_ difficult to find but mapping guidelines are few, far between, and often incomplete. The second challenge is to then translate these guidelines to fit your particular use case. Only after working all of this out can you actually implement accessibility features.

So my hope is that this chat interface will jump start the process. In theory, an agent can lower this bar by accessing and analyzing accessibility guidelines while simultaneously implementing them. Crucially, I ensure that it would explain exactly what it had changed based on your prompt and why it made those changes.

# What did I actually do?

When my experimental version of Maputnik loads, an additional "chat" button at the top row of controls opens a chat window.

<figure>
  <img  src="./assets/Landing.png" alt="" />
    <figcaption style="font-size:.8em; line-height: 1em;">Maputnik map editor with the new Chat button outlined in red</figcaption>
</figure>

The chat window prompts the user to edit the map style. Along with a button to upload images that can be referenced with the text prompt.

<figure>
  <img  src="./assets/Chat_Window_Plus_Button.png" alt="" />
      <figcaption style="font-size:.8em; line-height: 1em;">The prompt window and button</figcaption>
</figure>

## Text Prompts

Maputnik works by editing a json file storing a map's style so my first task was to see what would happen if I send the json file, along with an editing prompt, to Anthropic's API. The answer was encouraging - it returned what looked like valid style json. But the API response took over 3 minutes to return, burned through tokens, money, undoubtedly electricity, and included natural language in the response in addition to the json.

I was able to cut response time dramatically by having the API return only the changed layers in and patch them in rather than returning the entire json contents and the problem was solved. Now, the issue is that it made changes but I had no way of knowing exactly what they were other than trying to look through every single layer and comparing the map visually before and after.

This is where I used my Cursor agent (btw, I use Cursor to code), to engineer a prompt for the Anthropic agent. The could then get a response including not only a list of the json patches made but an explanation of why it decided to make them.

![Dyslexia Labels Prompt](./assets/DyslexPrompt.png)
<br>
I started testing my idea by looking at labels. I prompted the agent to "change all of the labels to be more easily read by users with dyslexia."

![Dyslexia Labels Response](./assets/DyslexResp.png)
<br>
The response was very encouraging. I was told exactly what properties on which layers were changed and **crucially** got an explanation as to why it made these changes:

"For dyslexia-friendly labels, I'll change all symbol/text layers to use a more readable font (Roboto Regular or Roboto Medium instead of Condensed Italic), increase text sizes slightly, increase letter spacing, increase halo width for better contrast, and remove uppercase transforms which are harder for dyslexic readers."
<br>

## Image Prompts

I tested the image upload functionality by loading the <a href="https://github.com/maputnik/osm-liberty">OSM Liberty Style</a>, uploading a photograph of a (wonderful) physical map of Glasgow's natural spaces by Urban Good hanging in the map corner of my living room. The map is available, along with maps of natural spaces in other UK cities at <a href="https://www.urbangood.org/collections/folded-maps">on Urban Good store</a>

<figure>
  <img  src="./assets/Full_Map.jpg" alt="" />

</figure>
<table>
<tbody>
<tr>
<td>
<figure>
  <img  src="./assets/Bit_About_Gran.jpg" alt="" />
  </figure>
</td>
<td>
  <figure>
      <img  src="./assets/UrbanNature_Blurb.jpg" alt="" />
  </figure>
  </td>
  </tr>
  </tbody>
  </table>
And I was, frankly, sufficiently surprised by the results after just a single prompt that the ethical implications started to worry me. Though not breaking any copyright laws I'm aware of and not making money from it, I certainly felt compelled to properly credit the original style's creators (above) and point visitors to their shop. (I also hope to the update this post after I reach out to the creators to get their feedback.)
<figure>
  <img  src="./assets/MapImage.jpg" alt="" />
    <figcaption style="font-size:.8em; line-height: 1em;">A quick snap shot I uploaded from my phone with a prompt to recreate the colors, labels, fonts etc. as closely as possible.</figcaption>
</figure>
<table>
<tbody>
<tr>
<td>
<figure>
  <img style="" src="./assets/OSMLiberty.png" alt="" />
      <figcaption style="font-size:.8em; line-height: 1em;">Original OSM Liberty map style</figcaption>
  </figure>
</td>
<td>
  <figure>
      <img  src="./assets/OSMLibWithChanges.png" alt="" />
       <figcaption style="font-size:.8em; line-height: 1em;">The OSM style after prompted to try matching Urban Good's Natural Spaces style from a photograph</figcaption>
  </figure>
  </td>
  </tr>
  </tbody>
  </table>

# What's next

I have many ideas on where this could go next but before considering them, my first task is to find accessibility researchers, experts, and users. While online guidance is thorough, I just won't know if/where this could fit in with web mapping on my own without consulting other people. I'd also like to get feedback from the maintainers of Maputnik and anyone who has worked on chat interfaces for design tools. This is an encouraging beginning but the rest depends on what feedback I receive from others.
