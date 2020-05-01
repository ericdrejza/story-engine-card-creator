import React from 'react'
import styled from 'styled-components'
import { Card, CardType } from '../Card/Card'

type LeftMenuProps = {
  card: CardType,
  setCard: (card: CardType) => void
  createNewCard: () => void
  deleteCard: () => void
  exportCards: () => void
  importCards: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LeftMenuContainer = styled.div`
  position: relative;
  height: 100vh;
  border-right: 1px solid black;
  background: gray;
  @media print {
    display: none;
  }
`

const Inner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: teal;
  padding: 10%;
`

const CardActionsBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
`

const CardContainer = styled.div`
  width: 100%;
`

const InputContainer = styled.div`
  margin-top: 4em;
`

const StyledInput = styled.input`
  width: 100%;
`

const PageActionsContainer = styled.div`
  margin-top: 4em;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const cardTypes = [
  'agent',
  'anchor',
  'aspect',
  'conflict',
  'engine'
]

export const LeftMenu = ({
  card,
  setCard,
  createNewCard,
  deleteCard,
  exportCards,
  importCards
}: LeftMenuProps) => {
  const { top, bottom, left, right, type } = card
  const setCardValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = event.target.value
    const key = event.target.name
    setCard({
      ...card,
      [key]: value
    })
  }
  return (
    <LeftMenuContainer>
      <Inner>
        <CardActionsBar>
          <button onClick={() => createNewCard()}>
            Create new card
          </button>
          <button onClick={() => deleteCard()}>
            Delete this card
          </button>
        </CardActionsBar>
        <CardContainer>
          <Card 
            bottom={bottom}
            top={top}
            left={left}
            right={right}
            type={type}
          />
        </CardContainer>
        <InputContainer>
          <StyledInput
            name='bottom'
            placeholder='bottom'
            value={bottom}
            onChange={e => setCardValue(e)}
          />
          <StyledInput
            name='top'
            placeholder='top'
            value={top}
            onChange={e => setCardValue(e)}
          />
          <StyledInput
            name='left'
            placeholder='left'
            value={left}
            onChange={e => setCardValue(e)}
          />
          <StyledInput
            name='right'
            placeholder='right'
            value={right}
            onChange={e => setCardValue(e)}
          />
          <select
            name='type'
            value={type}
            onChange={e => setCardValue(e)}
          >
            {cardTypes.map((type, i) => (
              <option key={`select-${i}`} value={type}>{type}</option>
            ))}
          </select>
        </InputContainer>
        <PageActionsContainer>
          <button onClick={() => window.print()}>Print Cards</button>
          <button onClick={() => exportCards()}>Export Cards</button>
          Import: <input type="file" name="file" onChange={e => importCards(e)}/>
        </PageActionsContainer>
      </Inner>
    </LeftMenuContainer>
  )
}
