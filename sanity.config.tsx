/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineDocuments, presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {debugSecrets} from '@sanity/preview-url-secret/sanity-plugin-debug-secrets'
import {defineConfig, definePlugin} from 'sanity'
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from "./sanity/schema";
import {theme as _theme} from './theme'
import {muxInput} from "sanity-plugin-mux-input";
import {PageTypes} from "@/sanity/pages";
import {map} from "rxjs";

const theme = _theme as import('sanity').StudioTheme

const sharedSettings = definePlugin({
  name: 'sharedSettings',
  plugins: [structureTool({
    title: 'Dashboard',
    name: 'dashboard',
    // @ts-ignore
    structure: (S) => S.list().title("Dashboard").items([
      S.listItem().title("Pages").child(
        S.documentList().apiVersion(apiVersion).title("Pages").filter(`_type in [${PageTypes.filter(type => type.name !== 'pageBlogPost').map(type => type.name).map(name => `"${name}"`).toString()}]`)
      ),
      S.listItem().title("Blog Articles").child(
        S.documentTypeList('pageBlogPost').apiVersion(apiVersion).title("Blog Articles").filter(`_type == "pageBlogPost"`)
      ),
      S.listItem().title("CTAs").child(
        S.documentTypeList('globalCTA').apiVersion(apiVersion).title('CTAs')
      ),
      S.listItem().title("Popups").child(
        S.documentTypeList('popup').apiVersion(apiVersion).title('Popups')
      ),
      S.listItem().title("Forms").child(
        S.documentTypeList('form').apiVersion(apiVersion).title('Forms').child(
          S.document().schemaType('form').views([
            S.view.form(),
            // S.view.component(DocumentsPane).options({
            //   query: `*[_type == "formSubmission" && form._ref == $id]`,
            //   params: {id: `_id`},
            //   useDraft: false,
            //   debug: true,
            // }).title('Submissions')
          ])
        )
      ),
      S.listItem().title("Headers").child(
        S.documentTypeList('header').apiVersion(apiVersion).title(`Headers`)
      ),
      S.listItem().title("Footers").child(
        S.documentTypeList('footer').apiVersion(apiVersion).title(`Footers`)
      ),
      S.listItem().title("Performance Graphs").child(
        S.documentTypeList('performanceGraph').apiVersion(apiVersion).title(`Performance Graphs`)
      ),
      S.listItem().title("Redirects").child(
        S.documentTypeList('redirect').apiVersion(apiVersion).title('Redirects')
      ),
    ]),
    // defaultDocumentNode: previewDocumentNode(),
  }), debugSecrets()],
  // @ts-ignore
  schema,
})

function Navbar(props: any) {
  return (
    <div className="studio-navbar">
      <>{props.renderDefault(props)}</>
    </div>
  )
}

const config = defineConfig({
  theme,
  title: 'Sanity Studio',
  studio: {
    components: {
      navbar: Navbar,
    }
  },
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    sharedSettings(),
    presentationTool({
      name: 'Editor',
      devMode: true,
      previewUrl: {
        origin: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' :
          (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? '' : ''),
        preview: '/',
        draftMode: {
          enable: '/api/draft',
          // disable: '/api/disable-draft',
        },
      },
      resolve: {
        locations: (params, context) => {
          const type = params?.type;

          if (type && type.startsWith("page")) {
            const doc$ = context.documentStore.listenQuery(
              `*[_type == "${type}" && _id == $id][0]`,
              params,
              {
                perspective: 'previewDrafts',
              }
            )

            return  doc$.pipe(
              // @ts-ignore
              map((doc) => {
                if (!doc || !doc.settings?.slug?.current) {
                  return null
                }

                return {
                  locations: [
                    {
                      title: doc.settings.name || doc.settings.title || "Untitled",
                      href: `${doc.settings.slug.current ?? ''}`,
                    }
                  ]
                }
              })
            )
          }

          const doc$ = context.documentStore.listenQuery(
            // select documents with fields named cta that use the id of the cta document
            `*[references($id) && _type match "page*"]`,
            params,
            {
              perspective: 'previewDrafts',
            }
          )

          if (!doc$) {
            return null;
          }

          return doc$.pipe(
            // @ts-ignore
            map((doc) => {
              if (!doc) {
                return null
              }

              return {
                // @ts-ignore
                locations: doc.filter(doc => doc != null).map((cta) => {
                  return {
                    title: cta.settings?.name || cta.settings?.title || "Untitled",
                    href: `${cta.settings?.slug.current ?? ''}`,
                  }
                })
              }
            })
          )

          return null;
        },
        mainDocuments: defineDocuments([
          {
            route: "/:slug",
            resolve: (ctx) => {
              return {
                filter: `_type match "page*" && settings.slug.current == $slug`,
                params: {
                  slug: '/'+ctx.params.slug,
                }
              }
            }
          }
        ])
      }
    }),
    visionTool({
      name: 'GROQ',
      title: 'GROQ',
      defaultApiVersion: apiVersion,
    }),
    muxInput({
      max_resolution_tier: "1080p"
    })
  ],
});

export default config;
