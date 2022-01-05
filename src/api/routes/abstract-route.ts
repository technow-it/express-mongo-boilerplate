import { AbstractService } from '@/services/abstract.service'
import { GenericSearch } from '@/utils'
import { plainToClass } from 'class-transformer'
import { Router, Request, Response, NextFunction } from 'express'
import { Document } from 'mongoose'
import { handleError, HasPermissions } from '../middlewares'
import { verifyAuthToken } from '@/api/middlewares'

export default <T extends Document>(route: Router, service: AbstractService<T>) => {
  //ADD
  route.post(
    '/add',
    verifyAuthToken,
    HasPermissions(service.getPermissions().CREATE),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const entity = await service.add(req.body)
        res.json(entity)
      } catch (e) {
        handleError(res, e)
      }
    }
  )

  //UPDATE
  route.put(
    '/:id',
    verifyAuthToken,
    HasPermissions(service.getPermissions().UPDATE),
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.params.id !== req.body._id) return res.status(400).json({ msg: 'Body id does not match the put request id' })
      try {
        const entity = await service.update(req.body)
        res.json(entity)
      } catch (e) {
        handleError(res, e)
      }
    }
  )

  //DELETE
  route.delete(
    '/:id',
    verifyAuthToken,
    HasPermissions(service.getPermissions().DELETE),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const entity = await service.delete(req.params.id)
        res.json(entity)
      } catch (e) {
        handleError(res, e)
      }
    }
  )

  //GET
  route.get(
    '/:id',
    verifyAuthToken,
    HasPermissions(service.getPermissions().READ),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const entity = await service.get(req.params.id)
        res.json(entity)
      } catch (e) {
        handleError(res, e)
      }
    }
  )

  //GETALL
  route.post(
    '/advancedsearch',
    verifyAuthToken,
    HasPermissions(service.getPermissions().READ),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const list: T[] = await service.advancedSearch(plainToClass(GenericSearch, req.body))
        res.json(list)
      } catch (e) {
        handleError(res, e)
      }
    }
  )

  //COUNT
  route.post('/advancedcount', verifyAuthToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const count = await service.advancedCount(plainToClass(GenericSearch, req.body))
      res.json(count)
    } catch (e) {
      handleError(res, e)
    }
  })
}
