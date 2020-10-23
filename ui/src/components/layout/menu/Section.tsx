import { Link, LinkTypeMap, Typography } from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { Variant } from '@material-ui/core/styles/createTypography'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

interface StyledLinkProps {
  to: string
  path: string
}

const StyledLink: OverridableComponent<LinkTypeMap<StyledLinkProps>> = styled(
  Link
)<StyledLinkProps>`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  color: ${props =>
    props.to === props.path
      ? props.theme.palette.primary.main
      : props.theme.palette.primary.light};
`

interface SectionProps {
  to: string
  path: string
  text: string
  variant: Variant
}

const Section = ({ to, path, text, variant }: SectionProps) => {
  return (
    <Typography variant={variant}>
      <StyledLink component={RouterLink} to={to} path={path}>
        {text}
      </StyledLink>
    </Typography>
  )
}

export default Section
