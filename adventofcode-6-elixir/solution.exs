require Logger

defmodule Solution do
  def maxEntry(list) do
    maxVal = Enum.max(list)
    Enum.find_index(list, fn(x) -> x == maxVal end)
  end

  def redistribute(list) do
    ind = maxEntry(list)
    pool = Enum.at(list, ind)
    list = List.replace_at(list, ind, 0)
    ind = rem(ind + 1, 16)

    distribute(list, ind, pool)
  end

  def distribute(list, ind, pool) when pool > 0 do
    distribute(
      List.update_at(list, ind, fn(x) -> x + 1 end),
      rem(ind + 1, 16),
      pool - 1
    )
  end

  def distribute(list, _, _) do
    list
  end

  def matchList(listA, listB) do
    !Enum.any?(
      List.zip([listA, listB]),
      fn(pair) -> elem(pair, 0) != elem(pair, 1) end
    )
  end

  def runCycle(list, count, observed) do
    if rem(count, 100) == 0 do
      Logger.info "#{inspect count}"
    end

    newList = redistribute(list)

    match = List.foldl(Enum.with_index(observed), nil, fn(pair, acc) ->
      case acc do
        nil ->
          case matchList(elem(pair, 0), newList) do
            false -> nil
            _ -> elem(pair, 1)
          end
        _ -> acc
      end
    end)

    if match do
      [count + 1, match + 1]
    else
      runCycle(
        newList,
        count + 1,
        [newList | observed]
      )
    end
  end
end

memList = [10, 3, 15, 10, 5, 15, 5, 15, 9, 2, 5, 8, 5, 2, 3, 6]

Logger.info "Before: #{inspect memList}"

Logger.info "Cycles until a repeat: #{inspect Solution.runCycle(memList, 0, [])}"

