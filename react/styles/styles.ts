
import styled from 'styled-components'

interface ContainerProps { 
  isOpen: boolean;
}

export const Container = styled.div`
  display: ${(props: ContainerProps) => props.isOpen ? 'flex' : 'none' };
`