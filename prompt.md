No componente @app/\_components/service-item.tsx, ao clicar em "reservar", abra o sheet que está na imagem que vou te mandar, usando o componente Sheet do shadcn.

-Use o componente Calendar do shadcn para renderizar o calendário;

- Ao clicar em um dia do calendário, exiba horários fixos(das 09 às 18h, de meia em meia hora. Exemplos: 09:00, 09:30, 10:00);
- Ao clicar no horário , exiba as informações de:
  --Nome e preço do serviço(em reais inteiros, não em centavos);
  --data selecionada no calendário,
  --Horário selecionado,
  --Nome da barbearia,
  --Habilite o botão de confirmar APENAS quando o dia e o horário estiverem sido selecionados

## Requisitos técnicos

- Armazene o dia selecionado como Date em um state;
- Armazene o horário selecionado como string em um state(por exemplo: "09:00");
- Receba como prop o serviço que está agendado e sua barbearia
