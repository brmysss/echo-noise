<template>
  <div class="announcement-container mx-auto w-full sm:max-w-2xl px-2">
    <div class="divider"></div>
    <div class="announcement-wrapper">
      <UIcon name="i-mdi-bell-outline" class="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" />
      <div class="announcement-text" :title="text">
        <MarkdownRenderer :content="text" :enableGithubCard="false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MarkdownRenderer from "~/components/index/MarkdownRenderer.vue"
const props = defineProps<{ text: string }>()
</script>

<style scoped>
.announcement-container { margin: 0.25rem auto 0.5rem; padding: 0 0.5rem; }
.divider { height: 1px; background: rgba(156, 163, 175, 0.25); margin-bottom: 8px; }
.announcement-wrapper { display: flex; align-items: center; overflow: hidden; }
.announcement-text { overflow-x: auto; white-space: nowrap; }
.announcement-text::-webkit-scrollbar { height: 6px; }
.announcement-text::-webkit-scrollbar-thumb { background: rgba(251, 146, 60, 0.5); border-radius: 8px; }
:global(html.dark) .announcement-text { color: #e5e7eb; }
:global(html:not(.dark)) .announcement-text { color: #374151; }
:global(html:not(.dark)) .announcement-text {
  color: #ffffff;
  -webkit-text-stroke: 0;
  text-shadow: none;
}
/* 压缩 Markdown 渲染为单行滚动效果 */
:deep(.markdown-preview) { display: inline; white-space: nowrap; }
:deep(.markdown-preview p) { display: inline; margin: 0; }
:deep(.markdown-preview h1),
:deep(.markdown-preview h2),
:deep(.markdown-preview h3),
:deep(.markdown-preview h4),
:deep(.markdown-preview h5),
:deep(.markdown-preview h6) { display: inline; margin: 0 0.5rem 0 0; font-size: 1rem; }
:deep(.markdown-preview a) { color: #fb923c; text-decoration: none; }
:deep(.markdown-preview a:hover) { text-decoration: underline; }
</style>
