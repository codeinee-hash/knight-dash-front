'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/kit/button'
import { GameModeSelect } from '@/widgets/game-panel/ui/game-mode-select'
import { useCreateMultiplayerGame } from '@/entities/multiplayer-game/model/use-create-multiplayer'
import { useJoinMultiplayerGame } from '@/entities/multiplayer-game/model/use-join-multiplayer'
import { Spinner } from '@/shared/ui/kit/spinner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/kit/dialog'
import { Input } from '@/shared/ui/kit/input'

export function MultiplayerPanel() {
  const [gameMode, setGameMode] = useState('30')
  const { create, isPending: isCreating } = useCreateMultiplayerGame()
  const { join, isPending: isJoining } = useJoinMultiplayerGame()

  const [roomCode, setRoomCode] = useState('')
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)

  const handleCreate = () => {
    create(Number(gameMode))
  }

  const handleJoin = () => {
    if (roomCode.length === 6) {
      join(roomCode)
    }
  }

  return (
    <div className='flex flex-col gap-6 items-center p-6 bg-[#393939] rounded-2xl w-[700px] max-w-full mx-auto'>
      <div className='w-full'>
        <h3 className='text-white text-lg font-medium mb-4 text-center'>Создать игру</h3>
        <div className='flex flex-col gap-4'>
          <GameModeSelect value={gameMode} onChangeAction={setGameMode} />
          <Button
            className='w-full text-primary/80 bg-[#252525] hover:bg-primary/20'
            onClick={handleCreate}
            disabled={isCreating || isJoining}
          >
            {isCreating ? <Spinner className='text-primary mr-2' /> : null}
            Создать игру
          </Button>
        </div>
      </div>

      <div className='w-full h-px bg-white/10' />

      <div className='w-full'>
        <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant='outline'
              className='w-full border-primary/50 text-primary hover:bg-primary/10'
              disabled={isCreating || isJoining}
            >
              Присоединиться по коду
            </Button>
          </DialogTrigger>
          <DialogContent className='bg-[#393939] border-none text-white sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Введите код комнаты</DialogTitle>
            </DialogHeader>
            <div className='flex flex-col gap-4 py-4'>
              <Input
                placeholder='Например: A1B2C3'
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={6}
                className='text-center tracking-widest text-lg font-mono bg-[#252525] border-none text-white focus-visible:ring-primary'
              />
              <Button
                className='w-full text-primary/80 bg-[#252525] hover:bg-primary/20'
                onClick={handleJoin}
                disabled={roomCode.length !== 6 || isJoining}
              >
                {isJoining ? <Spinner className='text-primary mr-2' /> : null}
                Подключиться
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
