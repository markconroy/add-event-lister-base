import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import StyledHeading from "../components/global-styles/headings.js"

const EventMeta = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  max-width: 500px;
  border: 3px solid #b30;
`

export default function EventTemplate({data}) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO 
        title={frontmatter.title}
      />
      <article>
        
        <StyledHeading reversed hasMetaData>{frontmatter.title}</StyledHeading>

        <EventMeta>
          {frontmatter.start_date < frontmatter.end_date ? (
            <Fragment>
              <p>
                From: <time datetime={frontmatter.start_date}>{frontmatter.start_date_as_string}</time><br></br>
                to: <time datetime={frontmatter.end_date}>{frontmatter.end_date_as_string}</time><br></br>
                <Link to={`/cities/${kebabCase(frontmatter.city)}`}>{frontmatter.city}</Link>, <Link to={`/countries/${kebabCase(frontmatter.country)}`}>{frontmatter.country}</Link><br />
                Website: <a href={frontmatter.website_address}>{frontmatter.website_name}</a>
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <p>
                Date: <time datetime={frontmatter.start_date}></time>{frontmatter.start_date_as_string}<time></time><br></br>
                in: 
                  <Link to={`/cities/${kebabCase(frontmatter.city)}`}>{frontmatter.city}</Link>, <Link to={`/countries/${kebabCase(frontmatter.country)}`}>{frontmatter.country}</Link><br />
                Website: <a href={frontmatter.website_address}>{frontmatter.website_name}</a>
              </p>
            </Fragment>
          )}
        </EventMeta>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      
    </Layout>
  )
}

export const eventPageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        path
        start_date
        end_date
        path_date: start_date(formatString: "YYYY-MM-DD")
        start_date_as_string: start_date(formatString: "Do MMM YYYY")
        end_date_as_string: end_date(formatString: "Do MMM YYYY")
        country
        city
        website_name
        website_address
      }
    }
  }
`