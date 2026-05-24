'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/shared/ui/kit/accordion'

export function GameRulesList() {
  return (
    <div className='w-full'>
      <Accordion type='single' collapsible defaultValue='item-1' className='w-full space-y-4'>
        <AccordionItem value='item-1' className='border border-[#494949] rounded-[12px] bg-[rgba(57,57,57,0.7)] px-5 border-b-0'>
          <AccordionTrigger className='text-white text-lg font-bold hover:no-underline py-5'>
            Одиночный режим (Solo)
          </AccordionTrigger>
          <AccordionContent className='text-white/80 text-base space-y-4 pt-2 pb-6'>
            <p>
              В одиночном режиме ваша цель — набрать как можно больше очков, собирая монеты <strong className="text-primary font-bold">GeekCoin</strong> за отведенное время.
            </p>
            <ul className='list-disc pl-5 space-y-2'>
              <li><strong>Управление:</strong> Вы управляете шахматным конём. Ходите только по правилам шахмат — буквой «Г» (две клетки в одну сторону и одна в другую). Возможные ходы будут подсвечиваться.</li>
              <li><strong>Сбор монет:</strong> На поле будут появляться монеты GeekCoin разного номинала (чем больше монета, тем больше очков). Прыгайте на клетку с монетой, чтобы забрать её.</li>
              <li><strong>Время:</strong> Перед стартом вы выбираете длительность игры (например, 15, 30 или 60 секунд). Постарайтесь собрать максимум монет до истечения времени!</li>
              <li><strong>Таблица лидеров:</strong> Ваш лучший результат сохранится и будет участвовать в глобальном рейтинге игроков.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-2' className='border border-[#494949] rounded-[12px] bg-[rgba(57,57,57,0.7)] px-5 border-b-0'>
          <AccordionTrigger className='text-white text-lg font-bold hover:no-underline py-5'>
            Игра с другом (Multiplayer)
          </AccordionTrigger>
          <AccordionContent className='text-white/80 text-base space-y-4 pt-2 pb-6'>
            <p>
              В многопользовательском режиме вы соревнуетесь с другим игроком в реальном времени. Это настоящая гонка на выживание!
            </p>
            <ul className='list-disc pl-5 space-y-2'>
              <li><strong>Создание комнаты:</strong> Один игрок создает комнату и делится уникальным кодом (6 символов) со вторым игроком.</li>
              <li><strong>Два коня на поле:</strong> Создатель комнаты играет белым конем, а присоединившийся — черным. Оба игрока ходят по правилам шахмат (буквой «Г») <strong>одновременно</strong>, не дожидаясь хода соперника.</li>
              <li><strong>Борьба за монеты:</strong> Монеты появляются на поле для обоих игроков. Кто первым успеет прыгнуть на монету, тот её и заберёт. Будьте быстрее соперника!</li>
              <li><strong>Победа:</strong> Игра заканчивается, когда истекает таймер. Побеждает тот, кто успел собрать монет на большую сумму. В случае равного счета объявляется ничья.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
