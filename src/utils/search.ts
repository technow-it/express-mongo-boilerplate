export class GenericSearch {
  general?: GeneralFilter
  equal?: BaseFilter[]
  like?: BaseFilter[]
  range?: RangeFilter[]
  dateRange?: DateRangeFilter[]
  offset?: number
  limit?: number
  sortField?: string
  sortDirection?: SortDirection

  get query() {
    const where: any = {}
    if (this.equal) {
      for (const filter of this.equal) {
        if (typeof filter.value !== 'boolean') {
          where[filter.field] = { $regex: `^${filter.value}$` }
          if (!filter.caseSensitive) where[filter.field].$options = 'i'
        } else {
          where[filter.field] = filter.value
        }
      }
    }
    if (this.like) {
      for (const filter of this.like) {
        where[filter.field] = { $regex: filter.value }
        if (!filter.caseSensitive) where[filter.field].$options = 'i'
      }
    }
    return where
  }

  get aggregate() {
    if (this.general && this.general.value) {
      const query = [
        {
          $addFields: {
            general: {
              $concat: this.general.fields,
            },
          },
        },
        {
          $match: {
            general: {
              $regex: this.general.value,
              $options: 'i',
            },
            ...this.query,
          },
        },
      ]
      return query
    }
  }

  get aggregateCount() {
    if (this.general) {
      const query = [
        {
          $addFields: {
            general: {
              $concat: this.general.fields,
            },
          },
        },
        {
          $match: {
            general: {
              $regex: this.general.value,
              $options: 'i',
            },
            ...this.query,
          },
        },
        {
          $count: 'ct',
        },
      ]
      return query
    }
  }
}

export enum SortDirection {
  ASCENDING = 1,
  DESCENDING = -1,
}

export interface BaseFilter {
  field: string
  value: string | number
  caseSensitive: boolean
}

export interface GeneralFilter {
  fields: string[]
  value: string | number | boolean
}

export interface RangeFilter {
  field: string
  start: number
  stop: number
}

export interface DateRangeFilter {
  field: string
  start: number
  stop: number
}
