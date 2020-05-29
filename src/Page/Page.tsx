import React from "react";
import styled from "styled-components";
import { MoveCard } from "../App";
import { DnDCard } from "../Card/DnDCard";
import { CardType } from "../Card/Card";

type PageProps = {
  cards: CardType[];
  setActiveCard: (index: number) => void;
  offsetIndex: number;
  activeCardIdx: number;
  backs?: boolean;
  quality: string;
  moveCard: MoveCard;
};

const PaperContainer = styled.div`
  width: 210mm;
  height: 297mm;
  position: relative;
  border: 1px solid black;
  @media print {
    border: none;
  }
`;

const PrintableArea = styled.div<{ reversed: boolean }>`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ reversed }) => (reversed ? "row-reverse" : "row")};
  align-content: flex-start;
`;

const CardWrapper = styled.div`
  width: 33.33%;
`;

const makeBack = (card: CardType, type: string) => {
  const name = type.toUpperCase();
  return {
    type: card.type,
    top: name,
    bottom: name,
    left: name,
    right: name,
  };
};

export const Page = ({
  cards,
  setActiveCard,
  offsetIndex = 0,
  activeCardIdx,
  quality,
  moveCard,
  backs,
}: PageProps) => {
  const displayedCards = backs ? cards.map((c) => makeBack(c, "")) : cards;
  return (
    <PaperContainer>
      <PrintableArea reversed={!!backs}>
        {displayedCards.map((card, index) => (
          <CardWrapper
            key={`cardwrapper-${index}`}
            onClick={() => setActiveCard(offsetIndex + index)}
          >
            <DnDCard
              quality={quality}
              back={!!backs}
              selected={activeCardIdx === index + offsetIndex}
              moveCard={moveCard}
              cardIndex={index + offsetIndex}
              {...card}
            />
          </CardWrapper>
        ))}
      </PrintableArea>
    </PaperContainer>
  );
};
