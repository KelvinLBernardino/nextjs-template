/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react'

import { IconType } from 'react-icons'
import {
  FaChevronLeft,
  FaChevronRight,
  FaSync,
  FaToggleOn,
  FaToggleOff,
  FaColumns,
  FaSortUp,
} from 'react-icons/fa'

interface Column {
  key: number
  label: string
  name: string
  visible?: boolean
}

type Row<T = Record<string, unknown>> = {
  id: string
} & T

type MenuActionType<T> = {
  key: number
  title: string
  icon: IconType
  onClick: (row: Row<T>) => void
}

interface TableProps<T> {
  columns: Column[]
  rows: Row<T>[]
  ariaLabel?: string
  refreshData: () => void
  menuAction?: MenuActionType<T>[]
}

type CellValue = string | number | React.ReactNode

const Table = <T,>(props: TableProps<T>): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const [columns, setColumns] = useState<Column[]>([])

  const [currentButtons, setCurrentButtons] = useState<number[]>([])
  const [currentItems, setCurrentItems] = useState<(T & Row)[]>([])
  const [filteredData, setFilteredData] = useState<(T & Row)[]>([])

  const [showColumnMenu, setShowColumnMenu] = useState<boolean>(false)
  const [reverseFilter, setReverseFilter] = useState<boolean>(false)

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [attributeFilter, setAttributeFilter] = useState<keyof (T & Row)>('id')

  const itemsPerPage = 50

  const sortByAttribute = (
    objects: (T & Row)[],
    attribute: keyof (T & Row),
  ): (T & Row)[] => {
    return objects.slice().sort((a, b) => {
      const valA = a[attribute]
      const valB = b[attribute]

      if (attribute === 'identificador') {
        const numA = parseInt(valA as string, 10)
        const numB = parseInt(valB as string, 10)
        return numA - numB
      } else if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB)
      } else {
        return 0
      }
    })
  }

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const handleSort = (attribute: keyof (T & Row)) => {
    if (attribute === attributeFilter) {
      setReverseFilter((prev) => !prev)
    } else {
      setAttributeFilter(attribute)
      setReverseFilter(false)
    }
  }

  const toggleColumnMenu = () => {
    setShowColumnMenu((prev) => !prev)
  }

  const toggleHideForKey = (key: number) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.key === key ? { ...column, visible: !column.visible } : column,
      ),
    )
  }

  const renderCellContent = <K extends keyof T>(value: T[K]): CellValue => {
    if (React.isValidElement(value)) {
      return value
    }
    return typeof value === 'string' || typeof value === 'number'
      ? value
      : String(value)
  }

  useEffect(() => {
    if (props.columns.length > 0) {
      setColumns(
        props.columns.map((item) => ({
          ...item,
          visible: true,
        })),
      )
    }
    if (props.rows.length > 0) {
      setFilteredData(props.rows)
    }
  }, [props.columns])

  useEffect(() => {
    const filterDataTable = () => {
      if (searchTerm === '' && props.rows?.length > 0) {
        const indexOfFirstItem = (currentPage - 1) * itemsPerPage
        const indexOfLastItem = indexOfFirstItem + itemsPerPage

        const tempItems = sortByAttribute(props.rows, attributeFilter)

        setFilteredData(tempItems)

        if (reverseFilter === true) {
          tempItems.reverse()
        }

        setCurrentItems(tempItems.slice(indexOfFirstItem, indexOfLastItem))

        const localTotalPages = Math.ceil(props.rows.length / itemsPerPage)
        setTotalPages(localTotalPages)

        const indice = (element: number) => {
          if (element >= 1 && element <= localTotalPages) {
            return true
          } else {
            return false
          }
        }

        const paginationButtons = [
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ]

        const filteredValues = paginationButtons.filter(indice)
        setCurrentButtons(filteredValues)
      } else {
        const searchInObjectAttributes = (
          object: T & Row,
          searchString: string,
        ): boolean => {
          for (let j = 0; j < columns.length; j++) {
            if (columns[j]?.visible === true) {
              const columnValue = object[columns[j].name as keyof (T & Row)]
              if (
                columnValue &&
                columnValue
                  .toString()
                  .toLowerCase()
                  .includes(searchString.toLowerCase())
              ) {
                return true // Retornar true se encontrar um valor correspondente
              }
            }
          }
          return false // Retornar false se nenhum valor correspondente for encontrado
        }

        const filtered = props.rows.filter((object) =>
          searchInObjectAttributes(object, searchTerm),
        )

        const indexOfFirstItem = (currentPage - 1) * itemsPerPage
        const indexOfLastItem = indexOfFirstItem + itemsPerPage

        const tempItems = sortByAttribute(filtered, attributeFilter)

        setFilteredData(tempItems)

        if (reverseFilter === true) {
          tempItems.reverse()
        }

        setCurrentItems(tempItems.slice(indexOfFirstItem, indexOfLastItem))

        const localTotalPages = Math.ceil(filtered.length / itemsPerPage)

        if (currentPage > localTotalPages) {
          setCurrentPage(1)
        }
        setTotalPages(localTotalPages)

        const indice = (element: number) => {
          return element >= 1 && element <= localTotalPages
        }

        const paginationButtons = Array.from(
          { length: localTotalPages },
          (_, i) => i + 1,
        )

        const filteredValues = paginationButtons.filter(indice)
        setCurrentButtons(filteredValues)
      }
    }

    if (props?.rows) {
      filterDataTable()
    }
  }, [
    attributeFilter,
    columns,
    currentItems.length,
    currentPage,
    itemsPerPage,
    props.columns,
    props.rows,
    reverseFilter,
    searchTerm,
  ])

  return (
    <div className="container mx-auto">
      <div className="mx-auto rounded-lg border border-gray-200 bg-white p-4 shadow-card">
        <div className="rounded-md border">
          {/* Header */}
          <div className="flex flex-row justify-between">
            <div className="flex flex-col px-4 w-1/2 border-r">
              <div className="py-1 font-semibold">Pesquisar Resultados:</div>
              <div className="flex w-full justify-end pb-2">
                <div className="w-full">
                  <input
                    type="text"
                    className="w-full rounded-md border border-input px-3 py-1 focus:outline-none focus:ring-1 focus:ring-gray-200"
                    placeholder="Pesquisar..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.currentTarget.value)
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex w-1/4 flex-col border-r justify-center items-center">
              <p className="px-4 py-1 font-semibold">Exibição:</p>
              <div>
                <div className="relative inline-block px-2">
                  <button
                    className="flex h-[34px] cursor-pointer items-center rounded px-2 transition hover:bg-whiteHover"
                    onClick={toggleColumnMenu}
                  >
                    <FaColumns className="mr-2 inline" /> Colunas
                  </button>
                  {showColumnMenu && (
                    <div className="absolute rounded-b-md border border-gray-200 bg-white shadow-cardMenu">
                      <ul className="w-max text-sm">
                        {columns.map((column, index) => (
                          <li
                            key={index}
                            className="flex cursor-pointer items-center px-3 py-2 transition hover:bg-whiteHover"
                            onClick={() => toggleHideForKey(column.key)}
                          >
                            {column.visible === true ? (
                              <FaToggleOn className="mr-1 text-green-700 hover:text-green-500" />
                            ) : (
                              <FaToggleOff className="mr-1 text-red-700 hover:text-red-500" />
                            )}
                            {column.label.toString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-1/4 flex-col border-r justify-center items-center">
              <p className="px-4 py-1 font-semibold">Atualizar:</p>
              <div className="relative inline-block px-2">
                <button
                  className="flex h-[34px] cursor-pointer items-center rounded bg-whiteHover px-2 py-1 transition"
                  onClick={props.refreshData}
                >
                  <FaSync className="mr-2 inline" /> Atualizar
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="max-h-[72vh] overflow-x-auto">
            <table
              className="min-w-full border-collapse border-b border-gray-200"
              aria-label={props.ariaLabel || 'Tabela de dados'}
            >
              <caption className="sr-only">
                {props.ariaLabel || 'Tabela de dados'}
              </caption>
              <thead>
                <tr>
                  {props?.menuAction && props.menuAction.length > 0 && (
                    <th
                      scope="col"
                      className="px-6 py-3 bg-gray-600 text-sm text-white uppercase"
                    >
                      Ações
                    </th>
                  )}
                  {columns.map(
                    (column) =>
                      column.visible === true && (
                        <th
                          key={column.key}
                          className="cursor-pointer bg-gray-600 px-2 py-2 text-center text-white"
                          onClick={() =>
                            handleSort(column.name as keyof (T & Row))
                          }
                        >
                          <div className="flex flex-row justify-evenly">
                            <div>{''}</div>
                            <div>{column.label}</div>
                            <div>
                              <FaSortUp className="ml-2 inline" />
                            </div>
                          </div>
                        </th>
                      ),
                  )}
                </tr>
              </thead>

              <tbody className="overflow-y-auto">
                {filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length + 2}
                      className="px-6 py-4 border-b border-gray-200 text-center text-sm text-gray-500"
                    >
                      Nenhum dado disponível
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row) => (
                    <tr
                      key={row.id}
                      className="max-h-[50px] overflow-y-auto odd:bg-white even:bg-gray-200"
                    >
                      <td className="space-x-4 px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                        <div className="flex justify-evenly">
                          {props?.menuAction &&
                            props.menuAction.length > 0 &&
                            props.menuAction.map((element) => (
                              <button
                                key={element.key}
                                onClick={() => element.onClick(row)}
                                type="button"
                                title={element.title}
                                className="text-gray-500 hover:text-gray-700"
                                aria-label={`${element.title} ${row.id}`}
                              >
                                <element.icon
                                  className="text-lg"
                                  aria-hidden="true"
                                />
                              </button>
                            ))}
                        </div>
                      </td>
                      {columns.map(
                        (column) =>
                          column.visible === true && (
                            <td
                              key={column.name}
                              className="px-6 py-4 border-b border-gray-200 text-center text-sm text-gray-700"
                              aria-label={column.label}
                            >
                              {renderCellContent(row[column.name as keyof T])}
                            </td>
                          ),
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end">
            <div className="flex border-l">
              <button
                className=" cursor-pointer border-r px-3 py-2 transition hover:bg-whiteHover"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              <div className="flex space-x-1">
                {currentButtons.map((element) => (
                  <button
                    key={element}
                    className={`border-r px-3 py-2 ${
                      element === currentPage ? 'bg-whiteHover' : ''
                    } hover:bg-whiteHover`}
                    onClick={() => handlePageChange(element)}
                  >
                    {element}
                  </button>
                ))}
              </div>
              <button
                className="cursor-pointer px-3 py-2 transition hover:bg-whiteHover"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalPages)}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
